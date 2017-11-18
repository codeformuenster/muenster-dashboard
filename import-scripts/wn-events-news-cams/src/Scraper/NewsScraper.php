<?php
namespace MSHACK\DataScraper\Scraper;

use MSHACK\DataScraper\Dto\WnEvent;
use MSHACK\DataScraper\Dto\WnNews;
use MSHACK\DataScraper\Services\GeoCoder;
use SimplePie;
use SimplePie_Item;

class NewsScraper extends BaseScraper {

	protected $feedUrl = "http://www.wn.de/rss/feed/wn_muenster";
	public function getData(){
		$feed = new SimplePie();
		$feed->cache = FALSE;
		$feed->set_feed_url($this->feedUrl);
		$feed->init();
		$feed->handle_content_type();
		$newsEntries = [];
		/** @var SimplePie_Item */
		foreach ($feed->get_items() as $item){
			$newsEntry = new WnNews();
			$newsEntry->setTitle($item->get_title());
			$newsEntry->setDescription($item->get_description());

			$feedDate = $item->get_local_date("%d.%m.%Y %H:%M:%S");
			$date = \DateTime::createFromFormat("d.m.Y H:i:s", $feedDate);
			$newsEntry->setDate($date);
			$newsEntry->setUrl($item->get_link());

			$newsEntries[] = $newsEntry;
		}
		return $newsEntries;
	}
}