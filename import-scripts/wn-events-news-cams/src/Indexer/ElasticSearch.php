<?php

namespace MSHACK\DataScraper\Indexer;

use Guzzle\Http\Client;

class ElasticSearch {
	protected $url = "http://familiendashboard_elasticsearch_1:9200/###TYPE###";

	/**
	 * Indexes the given geo object to the elastic search index
	 * @param $entry
	 */
	public function transferToIndex($entry, $type){
		$typedUrl = str_replace("###TYPE###", $type, $this->url);
		$guzzle = new Client();
		$request = $guzzle->post($typedUrl,
		[
			'content-type' => 'application/json'
		]);
		$request->setBody(json_encode($entry));
		$request->send();
	}
}
