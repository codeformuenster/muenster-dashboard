<?php

namespace MSHACK\DataScraper\Commands;

use MSHACK\DataScraper\Dto\WnEvent;
use MSHACK\DataScraper\Indexer\ElasticSearch;
use MSHACK\DataScraper\Scraper\WnScraper;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class ScrapeWnCommand extends Command {

	protected function configure() {
		$this
			->setName('scrape:events')
			->setDescription('Scrapes WN event data')
		;
	}

	protected function execute(InputInterface $input, OutputInterface $output) {
		$es = new ElasticSearch();
		$wnScraper = new WnScraper();
		$wnEvents = $wnScraper->getData();

		/** @var WnEvent $event */
		foreach ($wnEvents as $event){
			$geodata = $event->transformToGeoData();
			$es->transferToIndex($geodata, "places/place");
		}

		$output->writeln(count($wnEvents)." events successfully imported to elastic search");
	}
}