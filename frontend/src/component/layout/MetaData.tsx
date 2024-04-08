import React from 'react'
import Helmet from 'react-helmet'

const MetaData = ({...props}) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <title>{props.title}</title>
    </Helmet>
  )
}

export default MetaData