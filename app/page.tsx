'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { TextArea } from '@/components/ui/TextArea'
import { Card } from '@/components/ui/Card'
import { Spinner } from '@/components/ui/Spinner'
import { TagsInput } from '@/components/ui/TagsInput'
import { Select } from '@/components/ui/Select'
import { CustomScrollbar } from '@/components/ui/CustomScrollbar'

export default function Home() {
  const [formData, setFormData] = useState({
    clientName: '',
    name: '',
    skills: [] as string[],
    projectDescription: '',
    budget: '',
    timeline: '',
    deliverables: ''
  })
  
  const [generatedProposal, setGeneratedProposal] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
    const skillsText = data.skills.length > 0 ? data.skills.join(', ') : 'full-stack development'
    const clientName = data.clientName || 'Client Name'
    const yourName = data.name || 'Your Name'
    const budget = data.budget || '$3000'
    const timeline = data.timeline || 'To be discussed'
    
    return `Hi ${clientName},

I understand the challenges you're facing with this project, and I'm confident I can provide a reliable and efficient solution tailored to your requirements. With my experience in ${skillsText}, I focus on delivering scalable, high-quality results that solve problems

Recent Projects:

Project 1 – [Link]
Project 2 – [Link]
Project 3 – [Link]

Portfolio:

Portfolio 1 – [Link]
Portfolio 2 – [Link]

Estimated Budget:

Hourly: $10/hr
Fixed: ${budget}

Timeline:

${timeline}

I would be happy to discuss your goals in more detail and outline the best approach to achieve them. Thank you for your time and consideration.

Best regards,

${yourName}`
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
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Client Name"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleInputChange}
                    placeholder="Enter client or company name"
                  />

                  <Input
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                  />
                </div>

                <TagsInput
                  label="Skills"
                  tags={formData.skills}
                  onChange={(tags) => setFormData(prev => ({ ...prev, skills: tags }))}
                  placeholder="Type skill and press Enter"
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

                  <Select
                    label="Timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    options={[
                      { value: '', label: 'Select timeline' },
                      { value: 'less than 1 week', label: 'Less than 1 week' },
                      { value: 'less than 2 weeks', label: 'Less than 2 weeks' },
                      { value: '1 to 2 weeks', label: '1 to 2 weeks' },
                      { value: 'less than 1 month', label: 'Less than 1 month' },
                      { value: '1 to 3 months', label: '1 to 3 months' },
                      { value: '3 to 6 months', label: '3 to 6 months' },
                      { value: 'more than 6 months', label: 'More than 6 months' }
                    ]}
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
                <div className="bg-gray-900 rounded-lg border border-gray-700 relative" style={{ height: '600px' }}>
                  <CustomScrollbar style={{ height: '100%' }}>
                    <div className="p-6">
                      <pre className="whitespace-pre-wrap font-sans text-sm text-gray-200 leading-relaxed">
                        {generatedProposal}
                      </pre>
                    </div>
                  </CustomScrollbar>
                </div>
              ) : (
                <div className="bg-gray-900 rounded-lg border border-gray-700 relative" style={{ height: '600px' }}>
                  <CustomScrollbar style={{ height: '100%' }}>
                    <div className="p-6">
                      <pre className="whitespace-pre-wrap font-sans text-sm text-gray-400 leading-relaxed">
{`Hi Client Name,

I understand the challenges you're facing with this project, and I'm confident I can provide a reliable and efficient solution tailored to your requirements. With my experience in full-stack development, I focus on delivering scalable, high-quality results that solve problems

Recent Projects:
Project 1 – [Link]
Project 2 – [Link]
Project 3 – [Link]

Portfolio:
Portfolio 1 – [Link]
Portfolio 2 – [Link]

Estimated Budget:
Hourly: $10/hr
Fixed: $3000

Timeline:
[Timeline]

I would be happy to discuss your goals in more detail and outline the best approach to achieve them. Thank you for your time and consideration.

Best regards,
Your Name`}
                      </pre>
                    </div>
                  </CustomScrollbar>
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

