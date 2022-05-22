import Image from 'next/image';
import {useState} from 'react';
import {DeviceCameraVideoIcon} from '@primer/octicons-react';
import {slugify} from '../utils/functions';
import styles from '../styles/page.module.scss';

function Video({block}) {
  const {url} = block.video.file;
  const caption = block.video.caption[0].plain_text;

  return (
    <div className={styles.video_wrapper}>
      <video className={styles.video} controls>
        <source src={url} type="video/mp4" />
      </video>

      <div className={styles.caption}>
        <span className={styles.icon}>
          <DeviceCameraVideoIcon />
        </span>
        {caption}
      </div>
    </div>
  );
}

function Page({data}) {
  return (
    <div className={styles.page}>
      {data.results.map((block) => {
        if (block.type === 'paragraph') {
          const text = block.paragraph.rich_text[0]?.plain_text;
          return <div className={styles.paragraph}>{text}</div>;
        }

        if (block.type === 'heading_3') {
          const text = block.heading_3.rich_text[0]?.plain_text;
          return <div className={styles.heading_3}>{text}</div>;
        }

        if (block.type === 'image') {
          const {url} = block.image.file;
          const caption = block.image.caption[0].plain_text;

          return (
            <div className={styles.image_wrapper}>
              <Image
                className={styles.image}
                src={url}
                layout="intrinsic"
                width="1024"
                height="768"
                priority
              />
              <div className={styles.caption}>{caption}</div>
            </div>
          );
        }

        if (block.type === 'video') {
          return <Video {...{block}} />;
        }

        if (block.type === 'quote') {
          const text = block.quote.rich_text[0]?.plain_text;
          return <div className={styles.quote}>{text}</div>;
        }

        return null;
      })}
    </div>
  );
}

export async function getStaticPaths() {
  const res = await fetch('https://curiosity.vercel.app/api/pages');
  const data = await res.json();

  const paths = data.results.map((page) => ({
    params: {slug: slugify(page.properties.name.title[0].plain_text)},
  }));

  return {paths, fallback: false};
}

export async function getStaticProps({params}) {
  const prevRes = await fetch('https://curiosity.vercel.app/api/pages');
  const prevData = await prevRes.json();
  const page = prevData.results.find(
    (pageDraft) =>
      slugify(pageDraft.properties.name.title[0].plain_text) === params.slug
  );

  const res = await fetch(
    `https://curiosity.vercel.app/api/page?id=${page.id}`
  );
  const data = await res.json();

  return {
    props: {
      data,
    },
    revalidate: 6 * 60 * 60,
  };
}

export default Page;
