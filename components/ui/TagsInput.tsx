import React, { useState, KeyboardEvent } from 'react'

interface TagsInputProps {
  label?: string
  tags: string[]
  onChange: (tags: string[]) => void
  placeholder?: string
  className?: string
}

export const TagsInput: React.FC<TagsInputProps> = ({
  label,
  tags,
  onChange,
  placeholder = 'Type and press Enter to add',
  className = ''
}) => {
  const [inputValue, setInputValue] = useState('')

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault()
      if (!tags.includes(inputValue.trim())) {
        onChange([...tags, inputValue.trim()])
      }
      setInputValue('')
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      onChange(tags.slice(0, -1))
    }
  }

  const removeTag = (index: number) => {
    onChange(tags.filter((_, i) => i !== index))
  }

  const inputId = `tags-input-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-300 mb-1">
          {label}
        </label>
      )}
      <div className="flex flex-wrap gap-2 p-2 border border-gray-600 rounded-lg bg-gray-700 focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-transparent transition-all duration-200">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center px-3 py-1 rounded-[5px] text-sm bg-primary-600 text-white"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="ml-2 hover:text-red-300 focus:outline-none"
            >
              ×
            </button>
          </span>
        ))}
        <input
          id={inputId}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? placeholder : ''}
          className="flex-1 min-w-[120px] bg-transparent text-white placeholder-gray-400 outline-none"
        />
      </div>
    </div>
  )
}

