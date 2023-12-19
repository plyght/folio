'use client'

import { FC, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import styles from '@css/about.module.css'
import { FiMapPin, FiMinus, FiPlus } from 'react-icons/fi'
import Image from 'next/image'
import Section from './Section'
import * as data from './data'
import { rgbDataURL } from '../MDX'


// Not my actual location, obviously
const center: mapboxgl.LngLatLike = [-96.438055, 32.782434]

const About: FC = () => (
  <div className={styles.box}>
    <div className={styles.container}>
      <div className={styles.image}>
        <Image
          src='/test.jpg'
          alt='Clouds'
          width={300.54}
          height={471}
          draggable={false}
          placeholder='blur'
          blurDataURL={rgbDataURL(204, 136, 105)}
          priority
        />
      </div>
      <div className={styles.image}>
        <Image
          src='/test2.jpg'
          alt='BMW M5'
          width={510}
          height={347.56}
          draggable={false}
          placeholder='blur'
          blurDataURL={rgbDataURL(156, 188, 201)}
          priority
        />
      </div>
    </div>
    <Section content={data.about} id='about'>
      <h1 className={styles.title}>About</h1>
    </Section>
    <Map />
    <Section
      content={data.work}
      extend={{
        title: 'All Works',
        href: 'https://github.com/plyght',
        newTab: true,
      }}
      id='works'
    >
      <h2 className={styles.title}>Select Work</h2>
    </Section>
    <Section
      content={data.writing}
      extend={{ title: '', href: '/' }}
      id='writing'
    >
      <h2 className={styles.title}></h2>
    </Section>
  </div>
)

const Map: FC = () => {
  const [zoom, setZoom] = useState(11)
  const [map, setMap] = useState<mapboxgl.Map | null>(null)

  return (
    <section className={styles.section} id='where'>
      <h2>Where</h2>
      <div className={styles.map_container}>
        <div className={styles.map}>
          <div className={styles.graphics}>
            <Image
              src='/photos/cloud.png'
              alt='cloud'
              width={390}
              height={347}
              className={styles.cloud}
            />
            <Image
              src='/photos/plane.png'
              alt='plane'
              width={24}
              height={56}
              className={styles.plane}
            />
            <Image
              src='/photos/plane-shadow.png'
              alt='plane shadow'
              width={24}
              height={24}
              className={styles.plane_shadow}
            />
          </div>
          <div className={styles.marker} aria-label='map marker'>
            <div>
              <div className={styles.shadow} />
              <div className={styles.dot}>
                <div />
              </div>
            </div>
          </div>
          <div className={styles.buttons}>
            <motion.button
              onClick={() => {
                map?.flyTo({ zoom: zoom === 11 ? 7 : 4 })
                setZoom((z) => z - 4)
              }}
              aria-label='zoom out'
              initial={{ scale: 0 }}
              animate={{ scale: zoom === 3 ? 0 : 1 }}
            >
              <FiMinus />
            </motion.button>
            <motion.button
              onClick={() => {
                map?.flyTo({ zoom: zoom === 7 ? 11 : 7 })
                setZoom((z) => z + 4)
              }}
              aria-label='zoom in'
              initial={{ scale: 0 }}
              animate={{ scale: zoom === 11 ? 0 : 1 }}
            >
              <FiPlus />
            </motion.button>
          </div>
          <div id='mapbox' className='light' />
        </div>
        <p className={styles.town}>
          <FiMapPin />
          <a
            href='https://en.wikipedia.org/wiki/Forney,_Texas'
            target='_blank'
            rel='noreferrer'
          >
            Forney, Texas
          </a>
        </p>
      </div>
    </section>
  )
}

export default About
