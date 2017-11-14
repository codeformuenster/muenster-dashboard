<?php
namespace MSHACK\DataScraper\Scraper;

class BaseScraper {
	protected function fetchContent ($url){
		$httpClient = new \Guzzle\Http\Client();
		$request = $httpClient->get($url);
		$response = $request->send();
		$htmlContent = $response->getBody(true);
		return $htmlContent;
	}
}