<?php

namespace MSHACK\DataScraper\Commands;

use MSHACK\DataScraper\Dto\WebCam;
use MSHACK\DataScraper\Dto\WnEvent;
use MSHACK\DataScraper\Indexer\ElasticSearch;
use MSHACK\DataScraper\Scraper\WebCamScraper;
use MSHACK\DataScraper\Scraper\WnScraper;
use MSHACK\DataScraper\Services\GeoCoder;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class ScrapeWebCamsCommand extends Command {

	protected function configure() {
		$this
			->setName('scrape:webcams')
			->setDescription('Scrapes WebCams')
		;
	}

	protected function execute(InputInterface $input, OutputInterface $output) {
		$es = new ElasticSearch();

		$webcamScraper = new WebCamScraper();
		$webcams = $webcamScraper->getData();

		/** @var WebCam $event */
		foreach ($webcams as $event){
			$geodata = $event->transformToGeoData();
			$es->transferToIndex($geodata, "places/place");
		}

		$output->writeln(count($webcams)." webcams successfully imported to elastic search");
	}
}