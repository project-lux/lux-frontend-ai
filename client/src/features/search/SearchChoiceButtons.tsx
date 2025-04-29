import React from 'react'
import styled from 'styled-components'
import { Button } from 'react-bootstrap'

const ChoiceButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  justify-content: center;
  flex-wrap: wrap;
`

interface SearchChoiceButtonsProps {
  choices: string[]
  onChoiceSelect: (choice: string) => void
}

const SearchChoiceButtons: React.FC<SearchChoiceButtonsProps> = ({ choices, onChoiceSelect }) => {
  return (
    <ChoiceButtonsContainer>
      {choices.map((choice, index) => (
        <Button
          key={index}
          variant="outline-secondary"
          onClick={() => onChoiceSelect(choice)}
          data-testid={`search-choice-${index}`}
        >
          {choice}
        </Button>
      ))}
    </ChoiceButtonsContainer>
  )
}

export default SearchChoiceButtons 