<?php
namespace MSHACK\DataScraper\GeoData;

class Address {

	/**
	 * @var string
	 */
	public $street;

	/**
	 * @var string
	 */
	public $zip;

	/**
	 * @var string
	 */
	public $district;

	/**
	 * @var string
	 */
	public $city;

	/**
	 * @var Geo
	 */
	public $geo;

	/**
	 * @return string
	 */
	public function getStreet() {
		return $this->street;
	}

	/**
	 * @param string $street
	 */
	public function setStreet($street) {
		$this->street = $street;
	}

	/**
	 * @return string
	 */
	public function getZip() {
		return $this->zip;
	}

	/**
	 * @param string $zip
	 */
	public function setZip($zip) {
		$this->zip = $zip;
	}

	/**
	 * @return string
	 */
	public function getDistrict() {
		return $this->district;
	}

	/**
	 * @param string $district
	 */
	public function setDistrict($district) {
		$this->district = $district;
	}

	/**
	 * @return string
	 */
	public function getCity() {
		return $this->city;
	}

	/**
	 * @param string $city
	 */
	public function setCity($city) {
		$this->city = $city;
	}

	/**
	 * @return Geo
	 */
	public function getGeo() {
		return $this->geo;
	}

	/**
	 * @param Geo $geo
	 */
	public function setGeo($geo) {
		$this->geo = $geo;
	}


}