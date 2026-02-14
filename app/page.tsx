'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { TextArea } from '@/components/ui/TextArea'
import { Card } from '@/components/ui/Card'
import { Spinner } from '@/components/ui/Spinner'

export default function Home() {
  const [formData, setFormData] = useState({
    clientName: '',
    projectTitle: '',
    projectDescription: '',
    budget: '',
    timeline: '',
    deliverables: ''
  })
  
  const [generatedProposal, setGeneratedProposal] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleGenerateProposal = async () => {
    setIsGenerating(true)
    setError('')
    setGeneratedProposal('')

    // Simulate AI generation (replace with actual API call later)
    setTimeout(() => {
      const proposal = generateMockProposal(formData)
      setGeneratedProposal(proposal)
      setIsGenerating(false)
    }, 2000)
  }

  const generateMockProposal = (data: typeof formData) => {
    return `PROPOSAL FOR ${data.clientName.toUpperCase() || 'CLIENT'}

Project Title: ${data.projectTitle || 'Untitled Project'}

EXECUTIVE SUMMARY

This proposal outlines our approach to deliver ${data.projectTitle || 'your project'} for ${data.clientName || 'your organization'}. We are committed to providing exceptional value and ensuring project success through our proven methodology and expertise.

PROJECT OVERVIEW

${data.projectDescription || 'Project description will be detailed here based on your requirements.'}

SCOPE OF WORK

Our comprehensive approach includes:
${data.deliverables || '• Detailed deliverables will be specified based on project requirements'}

TIMELINE

${data.timeline || 'Project timeline will be determined based on scope and requirements'}

INVESTMENT

${data.budget ? `Total Investment: ${data.budget}` : 'Investment details will be provided based on project scope'}

NEXT STEPS

1. Review and approval of this proposal
2. Contract signing and project kickoff
3. Regular progress updates and milestone reviews

We look forward to partnering with you on this exciting project.

Best regards,
Your Team`
  }

  const handleCopyProposal = () => {
    navigator.clipboard.writeText(generatedProposal)
    alert('Proposal copied to clipboard!')
  }

  const handleDownloadProposal = () => {
    const blob = new Blob([generatedProposal], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `proposal-${formData.clientName || 'client'}-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="space-y-6">
            <Card>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-white mb-2">
                  Project Details
                </h2>
                <p className="text-gray-300">
                  Fill in the details below to generate your proposal
                </p>
              </div>

              <div className="space-y-4">
                <Input
                  label="Client Name"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleInputChange}
                  placeholder="Enter client or company name"
                />

                <Input
                  label="Project Title"
                  name="projectTitle"
                  value={formData.projectTitle}
                  onChange={handleInputChange}
                  placeholder="e.g., Website Redesign Project"
                />

                <TextArea
                  label="Project Description"
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleInputChange}
                  placeholder="Describe the project, goals, and objectives..."
                  rows={4}
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    placeholder="e.g., $10,000"
                  />

                  <Input
                    label="Timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    placeholder="e.g., 3 months"
                  />
                </div>

                <TextArea
                  label="Key Deliverables"
                  name="deliverables"
                  value={formData.deliverables}
                  onChange={handleInputChange}
                  placeholder="List the main deliverables (one per line)"
                  rows={3}
                />

                <Button
                  onClick={handleGenerateProposal}
                  isLoading={isGenerating}
                  disabled={isGenerating}
                  className="w-full"
                  size="lg"
                >
                  {isGenerating ? 'Generating Proposal...' : '✨ Generate AI Proposal'}
                </Button>

                {error && (
                  <div className="p-4 bg-red-900/20 border border-red-700 rounded-lg text-red-400">
                    {error}
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Generated Proposal */}
          <div className="space-y-6">
            <Card>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-2">
                    Generated Proposal
                  </h2>
                  <p className="text-gray-300">
                    Your AI-generated proposal will appear here
                  </p>
                </div>
                {generatedProposal && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyProposal}
                    >
                      📋 Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDownloadProposal}
                    >
                      💾 Download
                    </Button>
                  </div>
                )}
              </div>

              {isGenerating ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <Spinner size="lg" />
                  <p className="mt-4 text-gray-300">AI is crafting your proposal...</p>
                </div>
              ) : generatedProposal ? (
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                  <pre className="whitespace-pre-wrap font-sans text-sm text-gray-200 leading-relaxed">
                    {generatedProposal}
                  </pre>
                </div>
              ) : (
                <div className="bg-gray-900 rounded-lg p-12 border-2 border-dashed border-gray-700 text-center">
                  <div className="text-6xl mb-4">📄</div>
                  <p className="text-gray-400 text-lg">
                    Fill in the form and click "Generate AI Proposal" to create your proposal
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-400 text-sm">
          <p>Developed by Hasnain Babar</p>
        </div>
      </div>
    </main>
  )
}

