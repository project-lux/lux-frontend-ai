import React, { useEffect, useRef, useState } from 'react'
import { Row } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom'
import styled from 'styled-components'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  addSimpleSearchInput,
  ISimpleSearchState,
} from '../../redux/slices/simpleSearchSlice'
import theme from '../../styles/theme'
import LoadingSpinner from '../common/LoadingSpinner'
import { pushClientEvent } from '../../lib/pushClientEvent'

const StyledSearchBox = styled.div`
  display: flex;
  width: ${theme.searchBox.width};
  border: solid 1px #979797;
  border-radius: ${theme.searchBox.borderRadius};
  font-size: 2rem;

  input {
    border: none;
    border-radius: ${theme.searchBox.borderRadius} 0 0
      ${theme.searchBox.borderRadius} !important;
    margin-left: 0px !important;
    max-width: ${theme.searchBox.width};
    font-weight: 300;
    height: 72px;
    font-size: inherit;
  }

  .submitButton {
    background-color: ${theme.color.white};
    border-radius: 0 ${theme.searchBox.borderRadius}
      ${theme.searchBox.borderRadius} 0;
    height: 72px;
    font-size: inherit;
  }
`

const SearchButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: ${theme.searchBox.width};
  margin-top: 10px;
  max-height: 400px;
  overflow-y: auto;

  .search-option-button {
    margin-bottom: 10px;
    text-align: left;
    white-space: pre-wrap;
    word-break: break-word;
    position: relative;
    padding: 16px;
    background-color: #01356b;
    border: none;
    border-radius: 8px;
    color: white;
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &:hover {
      background-color: #014c99;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
  }

  .likelihood-badge {
    position: absolute;
    right: 10px;
    top: 10px;
    background-color: rgba(255, 255, 255, 0.2);
    color: white;
    border-radius: 10px;
    padding: 2px 8px;
    font-size: 0.8rem;
    font-weight: bold;
  }

  .rewritten-text {
    font-weight: bold;
    color: white;
    font-style: italic;
    font-size: 1.1rem;
    letter-spacing: 0.01em;
    line-height: 1.4;
  }
`

interface ITranslatedQuery {
  query: Record<string, unknown>
  scope: string
  rewritten?: string
  likelihood?: number
}

interface ITranslationResponse {
  ambiguous: boolean
  options: Array<{
    likelihood: number
    parsed: string
    q: Record<string, unknown>
    rewritten: string
  }>
}

const SearchBox: React.FC<{
  unselectable?: boolean
  closeSearchBox?: () => void
  id: string
  isResults?: boolean
  setIsError: (x: boolean) => void
  isSearchOpen?: boolean
}> = ({
  unselectable: isUnselectable,
  closeSearchBox,
  id,
  isResults,
  setIsError,
  isSearchOpen = false,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [translatedQueries, setTranslatedQueries] = useState<
    ITranslatedQuery[]
  >([])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const currentState = useAppSelector(
    (state) => state.simpleSearch as ISimpleSearchState,
  )
  const dispatch = useAppDispatch()

  let simpleQuery: string | null = null
  const { search } = useLocation()
  const queryString = new URLSearchParams(search)
  simpleQuery = queryString.get('sq') || ''

  useEffect(() => {
    if (simpleQuery !== null) {
      dispatch(addSimpleSearchInput({ value: simpleQuery }))
    }
  }, [dispatch, simpleQuery])

  // If on the results page, get the current search query
  if (isResults) {
    if (currentState.value === null) {
      dispatch(addSimpleSearchInput({ value: simpleQuery }))
    }
  }

  const navigate = useNavigate()

  const inputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (
    event: React.FormEvent<HTMLInputElement>,
  ): void => {
    const { value } = event.currentTarget
    dispatch(addSimpleSearchInput({ value }))
  }

  const validateInput = (): boolean => {
    const { value } = currentState
    return value !== null && value.trim() !== '' // ignore empty search string
  }

  const fetchTranslateMulti = (): void => {
    setIsLoading(true)
    setErrorMessage(null)
    const urlParams = new URLSearchParams()

    // Validate input before sending
    if (!currentState.value || currentState.value.trim() === '') {
      setErrorMessage('Please enter a search query')
      setIsError(true)
      setIsLoading(false)
      console.error('Invalid search string: empty or undefined')
      return
    }

    urlParams.set('q', currentState.value)
    console.log(
      `http://10.5.35.3:8080/api/translate_multi/item?${urlParams.toString()}`,
    )

    fetch(
      `http://10.5.35.3:8080/api/translate_multi/item?${urlParams.toString()}`,
    )
      .then((response) => {
        if (response.ok) {
          response
            .json()
            .then((data: ITranslationResponse) => {
              if (data && data.options && data.options.length > 0) {
                const translatedOptions = data.options.map((option) => ({
                  query: option.q,
                  scope: (option.q._scope as string) || 'item',
                  rewritten: option.rewritten,
                  likelihood: option.likelihood,
                }))
                setTranslatedQueries(translatedOptions)
                setIsLoading(false)
              } else {
                // No valid options returned
                console.error('No valid translation options returned', data)
                setErrorMessage(
                  "We couldn't understand that query. Try rephrasing it or use simpler terms.",
                )
                setIsError(true)
                setIsLoading(false)
              }
            })
            .catch((error) => {
              console.error('Error parsing JSON response:', error)
              setErrorMessage('An error occurred while processing your search')
              setIsError(true)
              setIsLoading(false)
            })
        } else {
          console.error('API returned error status:', response.status)
          setIsLoading(false)
          setIsError(true)

          // Try to get more details about the error
          response
            .text()
            .then((text) => {
              console.error('Error response:', text)
            })
            .catch(() => {
              console.error('Could not read error response')
            })
        }
      })
      .catch((error) => {
        console.error('Error fetching translation options:', error)
        setIsLoading(false)
        setIsError(true)
      })
  }

  const handleNavigate = (
    query: Record<string, unknown>,
    scope: string,
  ): void => {
    // Directly use the query object from the selected option
    const newUrlParams = new URLSearchParams()
    const tabMap = {
      item: 'objects',
      work: 'works',
      agent: 'people',
      concept: 'concepts',
      place: 'places',
      event: 'events',
      set: 'collections',
      Group: 'collections', // Add potential raw value mappings
      Person: 'people',
      Organization: 'people',
      VisualItem: 'objects',
      PhysicalObject: 'objects',
      Set: 'collections',
    }

    // Enhanced debug logging to identify the issue
    console.log('Original scope from selection:', scope)
    console.log('Original query:', query)

    // Get the tab from the scope with a fallback
    const scopeToUse = scope || (query._scope as string) || 'item'
    const newTab = tabMap[scopeToUse as keyof typeof tabMap] || 'objects' // Default to objects if mapping fails

    console.log('Scope used for tab mapping:', scopeToUse)
    console.log('Resulting tab:', newTab)

    // Make a copy of the query to avoid mutating the original
    const queryToUse = { ...query }

    // Remove _scope as it's handled separately via the tab
    if ('_scope' in queryToUse) {
      delete queryToUse._scope
    }

    // Set the query parameter for the URL - exactly as received from the API
    newUrlParams.set('q', JSON.stringify(queryToUse))

    // Debug logging
    console.log('Navigation query:', queryToUse)
    console.log(
      'Navigation URL:',
      `/view/results/${newTab}?${newUrlParams.toString()}`,
    )

    if (closeSearchBox) {
      closeSearchBox()
    }

    inputRef.current!.value = ''
    setTranslatedQueries([])
    setIsError(false)
    setIsLoading(false)

    pushClientEvent('Search Button', 'Submit', 'Simple Search')

    // Navigate to the results page with the selected query
    navigate(
      {
        pathname: `/view/results/${newTab}`,
        search: `${newUrlParams.toString()}`,
      },
      {
        state: {
          fromNonResultsPage: !isResults,
        },
      },
    )
  }

  const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    if (validateInput()) {
      fetchTranslateMulti()
    }
  }

  useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current.focus()
    }

    if (isSearchOpen) {
      inputRef.current!.focus()
    }
  }, [isSearchOpen])

  return (
    <Row className={`${isResults ? 'py-3' : ''} mx-0`}>
      <div className="col-12 d-flex justify-content-center flex-column align-items-center">
        <StyledSearchBox>
          <form
            className="w-100"
            onSubmit={submitHandler}
            data-testid={`${id}-simple-search-form`}
          >
            <div className="input-group">
              <label htmlFor={id} className="d-none">
                Search Input Box
              </label>
              <input
                id={id}
                type="text"
                className="form-control"
                placeholder="Search LUX"
                onChange={handleInputChange}
                ref={inputRef}
                tabIndex={isUnselectable ? -1 : 0}
                value={currentState.value !== null ? currentState.value : ''}
                data-testid={`${id}-search-submit-input`}
              />
              <div className="input-group-append submitButtonDiv">
                <button
                  disabled={!validateInput()}
                  type="submit"
                  className="btn submitButton"
                  aria-label="submit search input"
                  data-testid={`${id}-search-submit-button`}
                >
                  {isLoading ? (
                    <LoadingSpinner />
                  ) : (
                    <i className="bi bi-search" />
                  )}
                </button>
              </div>
            </div>
          </form>
        </StyledSearchBox>

        {errorMessage && (
          <div className="alert alert-danger mt-3" role="alert">
            {errorMessage}
          </div>
        )}

        {translatedQueries.length > 0 && (
          <SearchButtonContainer>
            <div className="mb-3 text-center">
              <strong>
                Select the interpretation that best matches your search:
              </strong>
            </div>
            {translatedQueries.map((option, index) => (
              <button
                key={index}
                className="btn btn-primary search-option-button"
                onClick={() => handleNavigate(option.query, option.scope)}
                title="Click to search using this interpretation"
              >
                {option.rewritten ? (
                  <div className="rewritten-text">{option.rewritten}</div>
                ) : (
                  <div className="rewritten-text">
                    Search option {index + 1}
                  </div>
                )}
                {option.likelihood !== undefined && (
                  <span className="likelihood-badge">
                    {Math.round(option.likelihood * 100)}%
                  </span>
                )}
              </button>
            ))}
          </SearchButtonContainer>
        )}
      </div>
    </Row>
  )
}

export default SearchBox
