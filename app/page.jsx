"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

import { Loader2, Scale, FileText, ExternalLink } from "lucide-react"

export default function LexiLegalAssistant()
  {
  const [query, setQuery] = useState("")
  const [response, setResponse] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const sampleQuery = `In a motor accident claim where the deceased was self-employed and aged 54–55 years at the time of death, is the claimant entitled to an addition towards future prospects in computing compensation under Section 166 of the Motor Vehicles Act, 1988? If so, how much?`

  const simulateApiCall = async () => {
   
    await new Promise((resolve) => setTimeout(resolve, 2000))

    return {
    
      answer:
        "Yes, under Section 166 of the Motor Vehicles Act, 1988, the claimants are entitled to an addition for future prospects even when the deceased was self-employed and aged 54–55 years at the time of the accident. In Dani Devi v. Pritam Singh, the Court held that 10% of the deceased's annual income should be added as future prospects.",
      citations: [
        {
          text: "as the age of the deceased at the time of accident was held to be about 54-55 years by the learned Tribunal, being self-employed, as such, 10% of annual income should have been awarded on account of future prospects.",
          source: "Dani_Devi_v_Pritam_Singh.pdf",
          link: "https://lexisingapore-my.sharepoint.com/:b:/g/personal/harshit_lexi_sg/EdOegeiR_gdBvQxdyW4xE6oBCDgj5E4Bo5wjvhPHpqgIuQ?e=TEu4vz",
          paragraph: "Para 7",
        },
      ],
    }
  }

  const handleSubmit = async () => {
    if (!query.trim()) return

    setIsLoading(true)
    try {
      const apiResponse = await simulateApiCall()
      setResponse(apiResponse)
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCitationClick = (citation) => {
    window.open(citation.link, "_blank")
  }

  const loadSampleQuery = () => {
    setQuery(sampleQuery)
    setResponse(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Scale className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Lexi Legal Assistant</h1>
          </div>
          <p className="text-gray-600">Ask legal questions and get answers with citations</p>
        </div>

        {/* Input section  */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Ask Your Legal Question
            </CardTitle>
            <CardDescription>

              Enter your legal query below and get answers with document citations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Textarea
                placeholder="Enter your legal question here..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                 className="min-h-[120px] resize-none"
                 disabled={isLoading}
              /> 


              <div className="flex gap-2">
                <Button onClick={handleSubmit} disabled={!query.trim() || isLoading} className="flex-1">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Submit Query"
                  )}
                </Button>
                <Button variant="outline" onClick={loadSampleQuery} disabled={isLoading}>
                  Load Sample Query
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Answer section */}
        {response && (
          <Card>
            <CardHeader>
              <CardTitle className="text-green-700">Legal Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-800 leading-relaxed">{response.answer}</p>
              </div>

              <Separator />

              {/* Citations section */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Supporting Citation

                  
                </h3>

                {response.citations.map((citation, index) => (
                  <Card key={index} className="bg-blue-50 border-blue-200">
                     <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <blockquote className="text-sm text-gray-700 italic border-l-4 border-blue-400 pl-4 flex-1">
                            "{citation.text}"
                           </blockquote>

                        </div>


                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {citation.source}
                            </Badge>
                            {citation.paragraph && (
                              <Badge variant="outline" className="text-xs">
                                {citation.paragraph}
                              </Badge>
                            )}
                          </div>

                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCitationClick(citation)}
                            className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
                          >
                            <ExternalLink className="h-3 w-3" />
                            View document
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Legal Disclaimer */}
        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="p-4">
            <p className="text-xs text-amber-800">
              <strong>Legal Disclaimer:</strong> refer an expert for beter knowledge on this .
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
