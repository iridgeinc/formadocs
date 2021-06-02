import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: 'Easy to create',
    imageUrl: 'img/undraw_create.svg',
    description: (
      <>
        Formadocs was created to make documentation easy.
        It can be used with a simple operation.
      </>
    ),
  },
  {
    title: 'Generate With OpenAPI',
    imageUrl: 'img/undraw_server.svg',
    description: (
      <>
        Formadocs allows you to generate documentation from OpenAPI.
        Can also use supplementary information that cannot be expressed by OpenAPI.
      </>
    ),
  },
  {
    title: 'Powered by Docusaurus v2',
    imageUrl: 'img/undraw_google_docs.svg',
    description: (
      <>
        The document is created using Docusaurus v2.
        Therefore, what can be expressed by Docusaurus v2 is feasible.
      </>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`Easy document generation tool`}
      description="Description will go into a meta tag in <head />">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <div className="hero__logo">
            <img src='img/logo.png' alt='icon' width="500px" />
          </div>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/')}>
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}
