<?php

namespace MSHACK\DataScraper\Dto;

use Geocoder\Model\Coordinates;
use MSHACK\DataScraper\GeoData\Address;
use MSHACK\DataScraper\GeoData\Entry;
use MSHACK\DataScraper\GeoData\Geo;

class WebCam {

	/**
	 * @var string
	 */
	protected $url;

	/**
	 * @var string
	 */
	protected $name;

	/**
	 * @var string
	 */
	protected $district;



	/**
	 * @var string
	 */
	protected $address;

	/**
	 * @var string
	 */
	protected $street;

	/**
	 * @var string
	 */
	protected $zip;

	/**
	 * @var string
	 */
	protected $city;

	/**
	 * @var string
	 */
	protected $category;

	/**
	 * @var []
	 */
	protected $coordinates;

	/**
	 * @return string
	 */
	public function getName() {
		return $this->name;
	}

	/**
	 * @param string $name
	 */
	public function setName($name) {
		$this->name = $name;
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
	 * @return \DateTime
	 */
	public function getDate() {
		return $this->date;
	}

	/**
	 * @param \DateTime $date
	 */
	public function setDate($date) {
		$this->date = $date;
	}


	/**
	 * @return string
	 */
	public function getAddress() {
		return $this->address;
	}

	/**
	 * @param string $address
	 */
	public function setAddress($address) {
		$this->address = $address;
	}

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
	 * @return string
	 */
	public function getCategory() {
		return $this->category;
	}

	/**
	 * @param string $category
	 */
	public function setCategory($category) {
		$this->category = $category;
	}

	/**
	 * @return Coordinates
	 */
	public function getCoordinates() {
		return $this->coordinates;
	}

	/**
	 * @param mixed $coordinates
	 */
	public function setCoordinates($coordinates) {
		$this->coordinates = $coordinates;
	}

	/**
	 * @return string
	 */
	public function getUrl() {
		return $this->url;
	}

	/**
	 * @param string $url
	 */
	public function setUrl($url) {
		$this->url = $url;
	}

	/**
	 * @param \Geocoder\Model\Address $address
	 */
	public function initializeAddress($address){
		$this->setStreet($address->getStreetName()." ".$address->getStreetNumber());
		$this->setZip($address->getPostalCode());
		$this->setCity($address->getLocality());
		$this->setCoordinates($address->getCoordinates());
	}
	/**
	 * Converts the current object to a valid geo object and returns it
	 *
	 * @return Entry
	 */
	public function transformToGeoData(){
		$entry = new Entry();
		$entry->setName($this->getName());
		$entry->setUrl($this->url);
		$entry->setType("webcam");

		$geo = new Geo();
		$geo->setLat($this->getCoordinates()->getLatitude());
		$geo->setLon($this->getCoordinates()->getLongitude());

		$address = new Address();
		$address->setDistrict($this->getDistrict());
		$address->setCity($this->getCity());
		$address->setZip($this->getZip());
		$address->setStreet($this->getStreet());
		$address->setGeo($geo);
		$entry->setAddress($address);

		return $entry;
	}
}