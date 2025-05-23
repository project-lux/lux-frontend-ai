import React from 'react'
import { Col } from 'react-bootstrap'

import { PageKey } from '../../config/cms'
import useTitle from '../../lib/hooks/useTitle'
import ContentPageParser from '../../lib/parse/cms/ContentPageParser'
import { processHtml } from '../../lib/parse/cms/helper'
import { useGetPageQuery } from '../../redux/api/cmsApi'
import StyledTermsOfUsePage from '../../styles/features/cms/TermsOfUsePage'

interface IProps {
  pageKey: PageKey
}

/**
 * Component used for rendering CMS data on multiple pages.
 * @param {PageKey} pageKey the name of the page used for retrieving the CMS data
 * @returns {JSX.Element}
 */
const TermsOfUsePage: React.FC<IProps> = ({ pageKey }) => {
  const result = useGetPageQuery({ pageKey })
  let title = ''
  let body = ''

  if (!result.isFetching && result.isSuccess && result.data) {
    const parser = new ContentPageParser(result.data)

    title = parser.getTitle()
    body = parser.getBody()
  }

  useTitle(title)

  return (
    <StyledTermsOfUsePage className="row" data-testid="content-page">
      <Col>
        {result.isSuccess && result.data && (
          <React.Fragment>
            <h1 data-testid="content-page-header">{title}</h1>
            <div
              dangerouslySetInnerHTML={{ __html: processHtml(body) }}
              data-testid="content-page-body"
            />
          </React.Fragment>
        )}
      </Col>
    </StyledTermsOfUsePage>
  )
}

export default TermsOfUsePage
