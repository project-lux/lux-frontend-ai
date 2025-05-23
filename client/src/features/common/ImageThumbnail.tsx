import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import sanitizeHtml from 'sanitize-html'
import Button from 'react-bootstrap/Button'
import Overlay from 'react-bootstrap/Overlay'

import { IImages } from '../../types/IImages'
import StyledImageThumbnail from '../../styles/features/common/ImageThumbnail'
import theme from '../../styles/theme'
import { stripYaleIdPrefix } from '../../lib/parse/data/helper'
import { pushClientEvent } from '../../lib/pushClientEvent'

interface IProps {
  imageInfo: IImages
  name: string
  linkUrl?: string
}

const popperConfig = {
  modifiers: [
    {
      name: 'flip',
      options: {
        fallbackPlacements: ['bottom', 'top', 'left'],
      },
    },
  ],
}

const ImageThumbnail: React.FC<IProps> = ({ imageInfo, linkUrl, name }) => {
  const [show, setShow] = useState(false)
  const attribRef = useRef(null)

  const onClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setShow(!show)
  }

  // Alt text for images
  const alt = imageInfo.attribution ? imageInfo.attribution : name

  return (
    <StyledImageThumbnail data-testid="image-thumbnail-container">
      {linkUrl !== undefined ? (
        <Link
          to={`/view/${stripYaleIdPrefix(linkUrl)}`}
          onClick={() =>
            pushClientEvent('Entity Link', 'Selected', 'Results Snippet Link')
          }
          data-testid="image-link"
        >
          <img
            key={imageInfo.imageUrls[0]}
            className="img-thumbnail"
            src={imageInfo.imageUrls[0]}
            alt={alt}
          />
        </Link>
      ) : (
        <img
          key={imageInfo.imageUrls[0]}
          className="img-thumbnail"
          src={imageInfo.imageUrls[0]}
          alt={alt}
          data-testid="img-thumbnail"
        />
      )}
      {imageInfo.attribution && (
        <React.Fragment>
          <Button
            ref={attribRef}
            onClick={onClick}
            onMouseEnter={() => setShow(true)}
            onMouseDown={() => {
              if (show) {
                setShow(false)
              }
            }}
            data-testid="image-attribution-overlay-button"
            aria-expanded={show}
            aria-label="Tooltip"
          >
            {!show && <i className="bi bi-question-circle open" />}
            {show && <i className="bi bi-x-circle close" />}
          </Button>
          <Overlay
            target={attribRef.current}
            flip
            show={show}
            placement="right"
            popperConfig={popperConfig}
            data-testid="image-attribution-overlay"
          >
            {({ ...props }) => (
              // eslint-disable-next-line jsx-a11y/no-static-element-interactions
              <div
                onMouseLeave={() => setShow(false)}
                {...props}
                style={{
                  position: 'absolute',
                  backgroundColor: 'rgba(220, 220, 220, 0.9)',
                  maxWidth: '50%',
                  padding: '2px 10px',
                  color: theme.color.black,
                  borderRadius: 3,
                  wordBreak: 'break-all',
                  fontWeight: '350',

                  ...props.style,
                }}
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(imageInfo.attribution, {
                    transformTags: {
                      a: sanitizeHtml.simpleTransform('a', {
                        target: '_blank',
                      }),
                    },
                  }),
                }}
              />
            )}
          </Overlay>
        </React.Fragment>
      )}
    </StyledImageThumbnail>
  )
}

export default ImageThumbnail
