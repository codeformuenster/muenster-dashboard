<?php

namespace MSHACK\DataScraper\Commands;

use MSHACK\DataScraper\Dto\WnEvent;
use MSHACK\DataScraper\Dto\WnNews;
use MSHACK\DataScraper\Indexer\ElasticSearch;
use MSHACK\DataScraper\Scraper\NewsScraper;
use MSHACK\DataScraper\Scraper\WnScraper;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class ScrapeNewsCommand extends Command {

	protected function configure() {
		$this
			->setName('scrape:news')
			->setDescription('Scrapes new from muenster')
		;
	}

	protected function execute(InputInterface $input, OutputInterface $output) {
		$newsScraper = new NewsScraper();
		$allNews = $newsScraper->getData();


		/** @var WnNews $news */
		foreach ($allNews as $news){
			$geodata = $news->transformToGeoData();

			$es = new ElasticSearch();
			$es->transferToIndex($geodata, "news/news");
		}

		$output->writeln(count($allNews)." news successfully imported to elastic search");
	}
}