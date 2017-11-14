<?php
namespace MSHACK\DataScraper\Scraper;

use MSHACK\DataScraper\Dto\WebCam;
use MSHACK\DataScraper\Dto\WnEvent;
use MSHACK\DataScraper\Dto\WnNews;
use MSHACK\DataScraper\Services\GeoCoder;
use SimplePie;
use SimplePie_Item;

class WebCamScraper extends BaseScraper {
	public function getData(){
		$webcams = [];
		$gecoder = new GeoCoder();

		$address = $gecoder->getCoordinates("Prinzipalmarkt 4-1, Münster");
		$wc = new WebCam();
		$wc->setUrl("http://www.stadt-muenster.de/medien/webcams/webcams-in-muenster-blick-auf-den-prinzipalmarkt.html");
		$wc->setName("Webcam am Prinzipalmarkt");
		$wc->initializeAddress($address);
		$webcams[] = $wc;

		$address = $gecoder->getCoordinates("Klemensstraße 10, 48143 Münster");
		$wc = new WebCam();
		$wc->setUrl("http://www.stadt-muenster.de/medien/webcams/webcams-in-muenster-blick-ueber-die-stadt.html");
		$wc->setName("Webcam Stadthaus 1");
		$wc->initializeAddress($address);
		$webcams[] = $wc;

		$address = $gecoder->getCoordinates("Aasee, Münster");
		$wc = new WebCam();
		$wc->setUrl("http://www.stadt-muenster.de/medien/webcams/webcams-in-muenster-blick-auf-den-aasee.html");
		$wc->setName("Webcam am Aasee");
		$wc->initializeAddress($address);
		$webcams[] = $wc;

		return $webcams;
	}
}