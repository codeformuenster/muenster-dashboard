<?php
namespace MSHACK\DataScraper\Scraper;

use MSHACK\DataScraper\Dto\WnEvent;
use MSHACK\DataScraper\Services\GeoCoder;

class WnScraper extends BaseScraper {
	protected $debug = FALSE;
	protected $baseUrl = "http://termine.wn.de/suche.php?pagerId=pgr2&nav=pos&pos=###PAGEID###&ort=M%C3%BCnster&suchtext=&day_from=###DAY_FROM###&month_from=###MONTH_FROM###&year_from=###YEAR_FROM###&day_to=###DAY_TO###&month_to=###MONTH_TO###&year_to=###YEAR_TO###&categories[]=-1";

	private function getUrl($pageId = 0){
		$dateTomorrow = new \DateTime();
		$dateTomorrow->modify("+1 day");
		$dateToday = new \DateTime();
		$url = $this->baseUrl;
		$parsedUrl = str_replace(
			[
				"###PAGEID###",
			    "###DAY_FROM###",
			    "###DAY_TO###",
			    '###MONTH_FROM###',
			    '###MONTH_TO###',
			    '###YEAR_FROM###',
			    '###YEAR_TO###'
			],
			[
				$pageId,
			    $dateToday->format("d"),
				$dateTomorrow->format("d"),
			    $dateToday->format("m"),
				$dateTomorrow->format("m"),
			    $dateToday->format("Y"),
				$dateTomorrow->format("Y"),
			], $url);

		return $parsedUrl;
	}

	private function getAllPageSites($baseUrl) {
		$matches = [];
		$content = $this->fetchContent($baseUrl);
		preg_match_all('/pos=(\d)/', $content, $matches);

		$allPageIds = array_unique($matches[1]);
		return $allPageIds;
	}

	protected function getDetailUrlForEventId($eventId){
		$currentDate = new \DateTime();
		$url = "http://termine.wn.de/termin/?termin_id=$eventId&datum=".$currentDate->format("d.m.Y");
		return $url;
	}

	protected function extractDetailContent($content){
		$matches = [];
		$regex = "/Veranstaltung:(?s)(.*)Telefon:/";
		if (preg_match($regex, $content, $matches)){
			$detailContent = $matches[0];
			$plainDetailContent = \Html2Text\Html2Text::convert($detailContent, TRUE);
			return $plainDetailContent;
		}else{
			Throw new \Exception("Unknown format");
		}
	}

	protected function getObjectFromDetailContent($detailHtml){
		$wnEvent = new WnEvent();

		$name = trim($this->getRegexResult($detailHtml, '/Veranstaltung:(.*)/'));
		$date = trim($this->getRegexResult($detailHtml, '/Datum:.*(\d\d\.\d\d.\d\d\d\d)/'));
		$category = trim($this->getRegexResult($detailHtml, '/Rubrik:(.*)/'));
		$address = trim($this->getRegexResult($detailHtml, '/Location:(?s)(.*)Telefon:/'));
		$district = trim($this->getRegexResult($detailHtml, '/Ort:(.*)/'));

		$wnEvent->setName($name);
		$wnEvent->setDate(\DateTime::createFromFormat('d.m.Y', $date));
		$wnEvent->setCategory($category);
		$wnEvent->setAddress($address);
		$wnEvent->setDistrict($district);
		return $wnEvent;
	}


	protected function getRegexResult($content, $regex){
		$matches = [];
		if (preg_match($regex, $content, $matches)){
			return $matches[1];
		}else{
			return "";
		}
	}

	/**
	 * @return array
	 */
	public function getData(){
		$allObjects = [];

		$allPageSites = $this->getAllPageSites($this->getUrl());

		foreach ($allPageSites as $pageSite){
			$objectsForPage = $this->getDataForPage($pageSite);
			if (count($objectsForPage) > 0){
				$allObjects = array_merge($objectsForPage, $allObjects);
			}
		}
		return $allObjects;
	}

	public function getDataForPage($pageId){
		$allObjects = [];
		$content = $this->fetchContent($this->getUrl($pageId));
		$eventIds = $this->getEventIdsFromContent($content);

		foreach ($eventIds as $eventId){
			try {
				$detailUrl = $this->getDetailUrlForEventId($eventId);
				$detailContent = $this->fetchContent($detailUrl);
				$detailHtml = $this->extractDetailContent($detailContent);

				$wnEvent = $this->getObjectFromDetailContent($detailHtml);
				$wnEvent->setUrl($detailUrl);
				$allObjects[] = $wnEvent;
			}catch (\Exception $ex){
				//TODO:
			}

			if ($this->debug){
				break;
			}
		}
		$this->initializeGeoCoordinates($allObjects);
		return $allObjects;
	}

	/**
	 * @param WnEvent[] $wnEvents
	 */
	protected function initializeGeoCoordinates(&$wnEvents){
		$geoCoder = new GeoCoder();
		/** @var WnEvent $event */
		foreach ($wnEvents as $key => &$event){
			$geoCodedObject = $geoCoder->getCoordinates($event->getAddress());
			if (!is_null($geoCodedObject)){
				$street = $geoCodedObject->getStreetName()." ".$geoCodedObject->getStreetNumber();
				$event->setCoordinates($geoCodedObject->getCoordinates());
				$event->setStreet($street);
				$event->setZip($geoCodedObject->getPostalCode());
				$event->setCity($geoCodedObject->getLocality());
			}else{
				//remove events where coordinates could not be retrieved
				unset($wnEvents[$key]);
			}
		}
	}


	protected function getEventIdsFromContent($content){
		$matches = [];
		$regex = "/termin_id=(\\d+)/";
		if (preg_match_all($regex, $content, $matches)){
			return $matches[1];
		}else{
			Throw new \Exception("No event IDs found");
		}
	}
}