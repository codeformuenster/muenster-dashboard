<?php
namespace MSHACK\DataScraper\Services;

class GeoCoder {

	/**
	 * @var \Geocoder\ProviderAggregator
	 */
    protected $geocoder;

	public function __construct() {
		$this->geocoder = new \Geocoder\ProviderAggregator();
		$adapter  = new \Ivory\HttpAdapter\CurlHttpAdapter();
		$chain = new \Geocoder\Provider\Chain([
			                                      new \Geocoder\Provider\GoogleMaps($adapter, 'de_DE', 'German', true),
		                                      ]);
		$this->geocoder->registerProvider($chain);
	}

	public function getCoordinates($addressString){
		try {
			$geocode = $this->geocoder->geocode($addressString);
			return $geocode->first();
		} catch (\Exception $e) {
			//TODO:
		}
	}

}