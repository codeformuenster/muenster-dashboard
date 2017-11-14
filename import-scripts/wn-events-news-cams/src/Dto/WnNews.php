<?php
namespace MSHACK\DataScraper\Dto;

use Html2Text\Html2Text;
use MSHACK\DataScraper\GeoData\News;

class WnNews {

	/**
	 * @var String
	 */
	protected $title;

	/**
	 * @var String
	 */
	protected $description;

	/**
	 * @var \DateTime
	 */
	protected $date;

	/**
	 * @var string
	 */
	protected $url;

	/**
	 * @return mixed
	 */
	public function getTitle() {
		return $this->title;
	}

	/**
	 * @param mixed $title
	 */
	public function setTitle($title) {
		$this->title = $title;
	}

	/**
	 * @return mixed
	 */
	public function getDescription() {
		return $this->description;
	}

	/**
	 * @param mixed $description
	 */
	public function setDescription($description) {
		$this->description  = Html2Text::convert($description, FALSE);
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
	public function getUrl() {
		return $this->url;
	}

	/**
	 * @param string $url
	 */
	public function setUrl($url) {
		$this->url = $url;
	}

	public function transformToGeoData(){
		$entry = new News();
		$entry->setTitle($this->getTitle());
		$entry->setUrl($this->url);
		$entry->setDescription($this->getDescription());
		$entry->setDate($this->getDate()->format("Y-m-d h:i:s"));
		return $entry;
	}



}