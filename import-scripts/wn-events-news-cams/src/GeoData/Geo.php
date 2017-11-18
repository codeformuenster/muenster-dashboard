<?php
namespace MSHACK\DataScraper\GeoData;

class Geo {

	/**
	 * @var float
	 */
	public $lat;

	/**
	 * @var float
	 */
	public $lon;

	/**
	 * @return float
	 */
	public function getLat() {
		return $this->lat;
	}

	/**
	 * @param float $lat
	 */
	public function setLat($lat) {
		$this->lat = $lat;
	}

	/**
	 * @return float
	 */
	public function getLon() {
		return $this->lon;
	}

	/**
	 * @param float $lon
	 */
	public function setLon($lon) {
		$this->lon = $lon;
	}
}