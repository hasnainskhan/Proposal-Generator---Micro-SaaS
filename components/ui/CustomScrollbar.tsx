'use client'

import React, { useRef, useEffect, useState } from 'react'

interface CustomScrollbarProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export const CustomScrollbar: React.FC<CustomScrollbarProps> = ({
  children,
  className = '',
  style
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [scrollTop, setScrollTop] = useState(0)
  const [scrollHeight, setScrollHeight] = useState(0)
  const [clientHeight, setClientHeight] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    const content = contentRef.current
    if (!container || !content) return

    const updateScroll = () => {
      setScrollTop(container.scrollTop)
      setScrollHeight(container.scrollHeight)
      setClientHeight(container.clientHeight)
    }

    updateScroll()
    container.addEventListener('scroll', updateScroll)
    
    const resizeObserver = new ResizeObserver(updateScroll)
    resizeObserver.observe(content)
    resizeObserver.observe(container)

    return () => {
      container.removeEventListener('scroll', updateScroll)
      resizeObserver.disconnect()
    }
  }, [])

  const handleScrollbarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current
    if (!container) return

    const scrollbar = e.currentTarget
    const rect = scrollbar.getBoundingClientRect()
    const clickY = e.clientY - rect.top
    const percentage = clickY / rect.height
    const newScrollTop = percentage * (scrollHeight - clientHeight)
    
    container.scrollTop = newScrollTop
  }

  const handleThumbDrag = (e: React.MouseEvent) => {
    e.preventDefault()
    const container = containerRef.current
    if (!container) return

    const startY = e.clientY
    const startScrollTop = container.scrollTop
    const thumbHeight = (clientHeight / scrollHeight) * clientHeight
    const maxThumbTop = clientHeight - thumbHeight

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaY = moveEvent.clientY - startY
      const scrollRatio = (scrollHeight - clientHeight) / maxThumbTop
      container.scrollTop = startScrollTop + deltaY * scrollRatio
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const thumbHeight = scrollHeight > 0 ? (clientHeight / scrollHeight) * clientHeight : 0
  const thumbTop = scrollHeight > clientHeight 
    ? (scrollTop / (scrollHeight - clientHeight)) * (clientHeight - thumbHeight)
    : 0
  const showScrollbar = scrollHeight > clientHeight

  return (
    <div className={`relative ${className}`} style={{ height: '100%', position: 'relative', ...style }}>
      <div
        ref={containerRef}
        className="overflow-y-auto hide-scrollbar"
        style={{ height: '100%', width: '100%', paddingRight: showScrollbar ? '12px' : '0' }}
      >
        <div ref={contentRef}>{children}</div>
      </div>
      {showScrollbar && (
        <div
          className="absolute top-0 cursor-pointer"
          style={{ 
            right: '4px',
            width: '10px',
            height: `${clientHeight}px`,
            backgroundColor: '#111827', 
            borderRadius: '10px',
            zIndex: 10
          }}
          onClick={handleScrollbarClick}
        >
          <div
            className="absolute right-0 rounded-full cursor-grab active:cursor-grabbing transition-colors"
            style={{
              top: `${thumbTop}px`,
              height: `${Math.max(thumbHeight, 20)}px`,
              width: '10px',
              backgroundColor: '#06b6d4',
              borderRadius: '12px',
            }}
            onMouseDown={handleThumbDrag}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#0891b2'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#06b6d4'
            }}
          />
        </div>
      )}
    </div>
  )
}

