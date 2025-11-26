"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { useState } from "react"
import React from "react"

interface HireUsModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function HireUsModal({ isOpen, onClose }: HireUsModalProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [professionals, setProfessionals] = useState<Array<{
    id: string
    skill: string
    skillLabel: string
    icon: string
    entries: Array<{id: string, count: string, level: string}>
  }>>([])
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [description, setDescription] = useState("")

  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const skillOptions = [
    { id: "react", label: "Hire React.Js Developers", mobileLabel: "React.Js", icon: "/react-icon.svg", shortLabel: "React.Js Developer" },
    { id: "ux-ui", label: "Hire UX/UI Designers", mobileLabel: "UX/UI", icon: "/ui-icon.svg", shortLabel: "UX/UI Designer" },
    { id: "node", label: "Hire Node.Js Developers", mobileLabel: "Node.Js", icon: "/node-icon.svg", shortLabel: "Node.Js Developer" },
    { id: "python", label: "Hire Python Developers", mobileLabel: "Python", icon: "/python-icon.svg", shortLabel: "Python Developer" },
    { id: "fullstack", label: "Hire Full Stack Developers", mobileLabel: "Full Stack", icon: "/full-stack-icon.svg", shortLabel: "Full Stack Developer" },
    { id: "cloud", label: "Hire Cloud Developers", mobileLabel: "Cloud", icon: "/cloud-icon.svg", shortLabel: "Cloud Developer" },
    { id: "mobile", label: "Hire Android / IOS Developers", mobileLabel: "Android/IOS", icon: "/android-icon.svg", shortLabel: "Android / IOS Developer" },
    { id: "javascript", label: "Hire Javascript Developers", mobileLabel: "Javascript", icon: "/js-icon.svg", shortLabel: "Javascript Developer" },
    { id: "devops", label: "Hire Dev-ops Developers", mobileLabel: "Dev-ops", icon: "/dev-ops-icon.svg", shortLabel: "Dev-ops Developer" },
  ]

  const steps = [
    { id: 0, name: "Skills", icon: "/skills-icon.svg", selectedIcon: "/skills-selected.svg" },
    { id: 1, name: "Professionals", icon: "/professions-icon.svg", selectedIcon: "/professions-icon.svg" },
    { id: 2, name: "Attachments", icon: "/attachment-icon.svg", selectedIcon: "/attachment-icon.svg" },
    { id: 3, name: "Summary", icon: "/summary-icon.svg", selectedIcon: "/summary-icon.svg" },
  ]

  const toggleSkill = (skillId: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skillId)
        ? prev.filter((id) => id !== skillId)
        : [...prev, skillId]
    )
  }

  const handleNext = () => {
    // Validation for each step
    if (currentStep === 0) {
      // Skills step - check if at least one skill is selected
      if (selectedSkills.length === 0) {
        return
      }
    } else if (currentStep === 1) {
      // Professionals step - check if all entries have count and level
      for (const professional of professionals) {
        for (const entry of professional.entries) {
          if (!entry.count || entry.count === "0" || !entry.level) {
            return
          }
        }
      }
    }
    
    if (currentStep < steps.length - 1) {
      // If moving from Skills to Professionals, create professional entries
      if (currentStep === 0 && selectedSkills.length > 0) {
        const newProfessionals = selectedSkills.map(skillId => {
          const skill = skillOptions.find(s => s.id === skillId)
          return {
            id: skillId,
            skill: skillId,
            skillLabel: skill?.shortLabel || skill?.label || "",
            icon: skill?.icon || "",
            entries: [{ id: `${skillId}-1`, count: "01", level: "" }]
          }
        })
        setProfessionals(newProfessionals)
      }
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const addProfessional = () => {
    const firstSkill = skillOptions[0]
    setProfessionals([...professionals, { 
      id: `new-${Date.now()}`, 
      skill: firstSkill.id, 
      skillLabel: firstSkill.shortLabel, 
      icon: firstSkill.icon,
      entries: [{ id: `new-${Date.now()}-1`, count: "01", level: "" }]
    }])
  }

  const addEntryToProfessional = (professionalId: string) => {
    setProfessionals(professionals.map(p => {
      if (p.id === professionalId) {
        return {
          ...p,
          entries: [...p.entries, { id: `${professionalId}-${Date.now()}`, count: "01", level: "" }]
        }
      }
      return p
    }))
  }

  const removeEntryFromProfessional = (professionalId: string, entryId: string) => {
    setProfessionals(professionals.map(p => {
      if (p.id === professionalId) {
        return {
          ...p,
          entries: p.entries.filter(e => e.id !== entryId)
        }
      }
      return p
    }))
  }

  const removeProfessional = (id: string) => {
    setProfessionals(professionals.filter(p => p.id !== id))
  }

  const updateProfessionalLevel = (professionalId: string, entryId: string, level: string) => {
    setProfessionals(professionals.map(p => {
      if (p.id === professionalId) {
        return {
          ...p,
          entries: p.entries.map(e => e.id === entryId ? { ...e, level } : e)
        }
      }
      return p
    }))
    setOpenDropdown(null)
  }

  const skillLevels = ["Fresher", "Associate", "Mid Level", "Senior Level"]

  const handleFileClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
    }
  }

  const handleSubmit = async () => {
    // Close modal and reset form
    onClose()
    
    // Reset form to initial state
    setCurrentStep(0)
    setSelectedSkills([])
    setProfessionals([])
    setUploadedFile(null)
    setDescription("")
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 z-50 backdrop-blur-sm"
          />

          {/* Modal Container for centering on desktop */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-full max-h-[calc(100vh-32px)] md:w-[814px] md:max-h-[90vh] bg-[#1A1D1F] text-white overflow-hidden rounded-[8px] flex flex-col pointer-events-auto"
              style={{
                boxShadow:
                  "0px -8px 4px 0px rgba(16, 239, 255, 0.04), 0px 8px 12px 6px rgba(16, 239, 255, 0.16)",
              }}
            >
            {/* Header */}
            <div className="flex-shrink-0 flex justify-between items-center p-4 md:p-6">
              <h2 className="text-xl md:text-2xl font-semibold">Hire Us</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Stepper */}
            <div className="flex-shrink-0 mb-4 md:mb-6 w-full flex justify-center items-center px-2 md:px-0 overflow-x-auto">
              <div className="flex items-center justify-between w-full max-w-[320px] md:max-w-none md:w-[766px]">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-start">
                    {/* Step Circle */}
                    <div className="flex flex-col items-center flex-shrink-0 gap-1 md:gap-3">
                      <div
                        className={`flex items-center justify-center transition-colors w-7 h-7 md:w-9 md:h-9 p-1.5 md:p-2 rounded-full ${
                          index === currentStep
                            ? "border-2 border-[#10EFFF] text-[#10EFFF] bg-transparent"
                            : index < currentStep
                            ? "bg-[#10EAFA] text-[#10EAFA]"
                            : "text-gray-500 bg-[#ABABAB]"
                        }`}
                      >
                        <img
                          src={index < currentStep ? step.selectedIcon : step.icon}
                          alt={step.name}
                          className="w-3.5 h-3.5 md:w-5 md:h-5"
                          style={{
                            filter: index === currentStep ? "brightness(0) saturate(100%) invert(79%) sepia(97%) saturate(2477%) hue-rotate(153deg) brightness(102%) contrast(101%)" : undefined
                          }}
                        />
                      </div>
                      <span
                        className={`text-[10px] md:text-sm whitespace-nowrap ${
                          index === currentStep
                            ? "text-white"
                            : "text-gray-500"
                        }`}
                      >
                        {step.name}
                      </span>
                    </div>

                    {/* Connector Line */}
                    {index < steps.length - 1 && (
                      <div
                        className={`w-[20px] md:w-[150px] h-[2px] md:h-[3px] rounded-[20px] mx-1 md:mx-2 mt-[12px] md:mt-[16.5px] ${
                          index < currentStep
                            ? "bg-[#10EFFF]"
                            : "bg-[#ABABAB]"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="w-full flex justify-center overflow-y-auto flex-1 px-4 md:px-6 pb-4">
              {currentStep === 0 && (
                <div className="w-full md:w-[766px] flex flex-col gap-3 md:gap-4">
                  <h3 className="text-base md:text-xl font-semibold">Select Skills</h3>
                  <div className="grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-3">
                    {skillOptions.map((skill, idx) => (
                      <button
                        key={skill.id}
                        onClick={() => toggleSkill(skill.id)}
                        className={`flex items-center justify-between rounded-lg md:rounded-xl transition-all px-2 md:px-4 py-2 md:py-3 bg-[#080B10] ${
                          idx === skillOptions.length - 1 ? "col-span-2 w-full" : "w-full"
                        } min-h-[48px] md:h-[68px] ${
                          selectedSkills.includes(skill.id)
                            ? "border border-[#10EFFF] hover:border-[#10EFFF]"
                            : "border border-[#2B2F32] hover:border-[#3B3F42]"
                        }`}
                        style={{
                          boxShadow: selectedSkills.includes(skill.id) 
                            ? "0px -1px 0px 0px rgba(16, 239, 255, 0.4) inset" 
                            : "0px -1px 0px 0px rgba(43, 47, 50, 0.6) inset",
                        }}
                      >
                        <div className="flex items-center space-x-1.5 md:space-x-3 min-w-0">
                          <div className="w-7 h-7 md:w-10 md:h-10 rounded-md md:rounded-lg bg-[#2B2F32] flex items-center justify-center flex-shrink-0">
                            <img
                              src={skill.icon}
                              alt={skill.label}
                              className="w-3.5 h-3.5 md:w-5 md:h-5"
                            />
                          </div>
                          <span className="text-white text-[10px] md:text-sm text-left truncate">
                            <span className="md:hidden">{skill.mobileLabel}</span>
                            <span className="hidden md:inline">{skill.label}</span>
                          </span>
                        </div>
                        <div
                          className={`w-4 h-4 md:w-5 md:h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ml-1 ${
                            selectedSkills.includes(skill.id)
                              ? "border-[#10EFFF] bg-[#10EFFF]"
                              : "border-gray-500"
                          }`}
                        >
                          {selectedSkills.includes(skill.id) && (
                            <svg
                              className="w-2.5 h-2.5 md:w-3 md:h-3 text-black"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path d="M5 13l4 4L19 7"></path>
                            </svg>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="w-full md:w-[768px] flex flex-col gap-4">
                  <h3 className="text-lg md:text-xl font-semibold">Add Professional Information</h3>
                  <div className="w-full md:w-[768px] flex flex-col gap-4 overflow-y-auto">
                    {professionals.map((professional) => (
                      <div 
                        key={professional.id} 
                        className="w-full md:w-[768px] bg-[#080B10] border border-[#2B2F32] rounded-lg p-3 md:p-4 flex-shrink-0"
                        style={{ minHeight: "152px" }}
                      >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2 md:gap-3">
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-[#2B2F32] flex items-center justify-center flex-shrink-0">
                              <img src={professional.icon} alt={professional.skillLabel} className="w-4 h-4 md:w-5 md:h-5" />
                            </div>
                            <div>
                              <h4 className="text-white font-medium text-sm md:text-base">{professional.skillLabel}</h4>
                              <p className="text-gray-400 text-xs md:text-sm">Enter Number of Professional and Skill Level.</p>
                            </div>
                          </div>
                          {professionals.length > 1 && (
                            <button onClick={() => removeProfessional(professional.id)} className="text-red-500 hover:text-red-400 flex-shrink-0">
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.5 5H17.5M8.33333 8.33333V13.3333M11.6667 8.33333V13.3333M3.33333 5L4.16667 15.8333C4.16667 16.2754 4.34226 16.6993 4.65482 17.0118C4.96738 17.3244 5.39131 17.5 5.83333 17.5H14.1667C14.6087 17.5 15.0326 17.3244 15.3452 17.0118C15.6577 16.6993 15.8333 16.2754 15.8333 15.8333L16.6667 5M7.5 5V3.33333C7.5 3.11232 7.5878 2.90036 7.74408 2.74408C7.90036 2.5878 8.11232 2.5 8.33333 2.5H11.6667C11.8877 2.5 12.0996 2.5878 12.2559 2.74408C12.4122 2.90036 12.5 3.11232 12.5 3.33333V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </button>
                          )}
                        </div>

                        {/* Multiple Entries */}
                        {professional.entries.map((entry, entryIndex) => (
                          <div key={entry.id} className="mb-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                              <div>
                                <label className="text-white text-xs md:text-sm mb-2 block">No. of Professional:</label>
                                <input 
                                  type="text" 
                                  value={entry.count}
                                  onChange={(e) => {
                                    setProfessionals(professionals.map(p => {
                                      if (p.id === professional.id) {
                                        return {
                                          ...p,
                                          entries: p.entries.map(ent => 
                                            ent.id === entry.id ? { ...ent, count: e.target.value } : ent
                                          )
                                        }
                                      }
                                      return p
                                    }))
                                  }}
                                  className="w-full bg-white text-black px-3 md:px-4 py-2 rounded-lg outline-none text-sm md:text-base"
                                  placeholder="01"
                                />
                              </div>
                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <label className="text-white text-xs md:text-sm">Skill Level</label>
                                  {entryIndex > 0 && (
                                    <button 
                                      onClick={() => removeEntryFromProfessional(professional.id, entry.id)}
                                      className="text-red-500 hover:text-red-400 text-xs"
                                    >
                                      Remove
                                    </button>
                                  )}
                                </div>
                                <div className="relative">
                                  <button
                                    type="button"
                                    onClick={() => setOpenDropdown(openDropdown === entry.id ? null : entry.id)}
                                    className="w-full bg-white text-gray-500 px-3 md:px-4 py-2 rounded-lg outline-none text-left flex items-center justify-between text-sm md:text-base"
                                  >
                                    <span className={entry.level ? "text-black" : "text-gray-500"}>
                                      {entry.level || "Select Skill Level"}
                                    </span>
                                    <svg 
                                      width="20" 
                                      height="20" 
                                      viewBox="0 0 20 20" 
                                      fill="none" 
                                      xmlns="http://www.w3.org/2000/svg"
                                      className={`transition-transform ${openDropdown === entry.id ? "rotate-180" : ""}`}
                                    >
                                      <path d="M5 7.5L10 12.5L15 7.5" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                  </button>
                                  {openDropdown === entry.id && (
                                    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg z-10 overflow-hidden">
                                      {skillLevels.map((level) => (
                                        <button
                                          key={level}
                                          type="button"
                                          onClick={() => updateProfessionalLevel(professional.id, entry.id, level)}
                                          className="w-full px-4 py-3 text-left text-black hover:bg-gray-100 transition-colors text-sm md:text-base"
                                        >
                                          {level}
                                        </button>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}

                        {/* Add More Button */}
                        <button 
                          onClick={() => addEntryToProfessional(professional.id)}
                          className="text-white text-sm flex items-center gap-2 hover:text-[#10EFFF] transition-colors mt-2"
                        >
                          <span className="text-xl">+</span> Add More
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="w-full md:w-[766px] flex flex-col bg-[#080B10] p-3 md:p-4 rounded-lg gap-4">
                  {/* Description */}
                  <div>
                    <label className="text-white mb-2 block text-sm md:text-base">Description:</label>
                    <textarea
                      placeholder="Write your Queries, or any Details."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full h-[140px] md:h-[185px] bg-white text-black rounded-lg outline-none resize-none border border-gray-300 text-sm md:text-base"
                      style={{
                        padding: "12px",
                      }}
                    />
                  </div>

                  {/* Attach Docs */}
                  <div>
                    <label className="text-white mb-2 block text-sm md:text-base">Attach Docs:</label>
                    {!uploadedFile ? (
                      <div 
                        className="w-full h-[140px] md:h-[164px] bg-[#1E2022] rounded-lg border-[1.5px] border-dashed border-[#2B2F32] flex flex-col items-center justify-center gap-3 md:gap-4 p-4"
                      >
                        <img 
                          src="/upload.svg" 
                          alt="Upload" 
                          className="w-10 h-8 md:w-14 md:h-9"
                        />
                        <div className="text-center">
                          <p className="text-white text-sm md:text-base mb-1">Upload your Doc's here</p>
                          <p className="text-gray-400 text-xs md:text-sm">JPG, PNG, HEIC up to 10MB</p>
                        </div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".jpg,.jpeg,.png,.heic"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <button 
                          onClick={handleFileClick}
                          type="button"
                          className="text-[#10EFFF] text-sm flex items-center gap-2 hover:text-[#0DD4E8] transition-colors"
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 12V4M8 4L5 7M8 4L11 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M2 12V13C2 13.5523 2.44772 14 3 14H13C13.5523 14 14 13.5523 14 13V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>
                          Choose file
                        </button>
                      </div>
                    ) : (
                      <div 
                        className="w-full h-auto min-h-[100px] md:h-[164px] bg-[#1E2022] rounded-lg border-[1.5px] border-solid border-[#10EFFF] flex items-center justify-between px-4 md:px-6 py-4"
                      >
                        <div className="flex items-center gap-3 md:gap-4">
                          <div className="w-10 h-10 md:w-12 md:h-12 bg-[#10EFFF]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-6 md:h-6">
                              <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#10EFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M14 2V8H20" stroke="#10EFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <div className="min-w-0">
                            <p className="text-white font-medium text-sm md:text-base truncate">{uploadedFile.name}</p>
                            <p className="text-gray-400 text-xs md:text-sm">{(uploadedFile.size / 1024).toFixed(2)} KB</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button
                            onClick={() => setUploadedFile(null)}
                            className="text-red-500 hover:text-red-400 transition-colors"
                          >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M2.5 5H17.5M8.33333 8.33333V13.3333M11.6667 8.33333V13.3333M3.33333 5L4.16667 15.8333C4.16667 16.2754 4.34226 16.6993 4.65482 17.0118C4.96738 17.3244 5.39131 17.5 5.83333 17.5H14.1667C14.6087 17.5 15.0326 17.3244 15.3452 17.0118C15.6577 16.6993 15.8333 16.2754 15.8333 15.8333L16.6667 5M7.5 5V3.33333C7.5 3.11232 7.5878 2.90036 7.74408 2.74408C7.90036 2.5878 8.11232 2.5 8.33333 2.5H11.6667C11.8877 2.5 12.0996 2.5878 12.2559 2.74408C12.4122 2.90036 12.5 3.11232 12.5 3.33333V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="w-full md:w-[766px] flex flex-col gap-4">
                  <h3 className="text-lg md:text-xl font-semibold">Hiring Summary:</h3>
                  <div className="flex flex-col gap-4 overflow-y-auto">
                    {professionals.map((professional) => (
                      <div 
                        key={professional.id}
                        className="w-full md:w-[734px] bg-[#080B10] border border-[#2B2F32] rounded-lg p-3 md:p-4"
                      >
                        {/* Header */}
                        <div className="flex items-center gap-2 md:gap-3 mb-4">
                          <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-[#2B2F32] flex items-center justify-center flex-shrink-0">
                            <img src={professional.icon} alt={professional.skillLabel} className="w-4 h-4 md:w-5 md:h-5" />
                          </div>
                          <div>
                            <h4 className="text-white font-medium text-sm md:text-base">{professional.skillLabel}</h4>
                            <p className="text-gray-400 text-xs md:text-sm">Professional Details</p>
                          </div>
                        </div>

                        {/* Entries Grid */}
                        <div className="space-y-3 md:space-y-4">
                          {professional.entries.map((entry) => (
                            <div key={entry.id} className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                              <div>
                                <label className="text-white text-xs md:text-sm mb-2 block">Skill Level</label>
                                <div className="w-full bg-[#3B3F42] text-white px-3 md:px-4 py-2 md:py-3 rounded-lg text-sm md:text-base">
                                  {entry.level || "Not specified"}
                                </div>
                              </div>
                              <div>
                                <label className="text-white text-xs md:text-sm mb-2 block">No. of Professionals</label>
                                <div className="w-full bg-[#3B3F42] text-white px-3 md:px-4 py-2 md:py-3 rounded-lg text-sm md:text-base">
                                  {entry.count}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}

                    {/* Uploaded File Section */}
                    {uploadedFile && (
                      <div className="w-full md:w-[734px] bg-[#080B10] border border-[#2B2F32] rounded-lg p-3 md:p-4">
                        <h4 className="text-white font-medium mb-3 text-sm md:text-base">Attached Document</h4>
                        <div className="flex items-center gap-3 bg-[#1E2022] rounded-lg p-3 border border-[#10EFFF]">
                          <div className="w-8 h-8 md:w-10 md:h-10 bg-[#10EFFF]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-5 md:h-5">
                              <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#10EFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M14 2V8H20" stroke="#10EFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <div className="min-w-0">
                            <p className="text-white font-medium text-xs md:text-sm truncate">{uploadedFile.name}</p>
                            <p className="text-gray-400 text-xs">{(uploadedFile.size / 1024).toFixed(2)} KB</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Footer with Buttons */}
            <div className="flex-shrink-0 p-4 md:p-6 flex justify-between bg-[#1A1D1F] border-t border-[#2B2F32]">
              {currentStep > 0 && (
                <button
                  onClick={handleBack}
                  className="border border-white text-white rounded-full font-medium hover:bg-white/10 transition-colors flex items-center justify-center px-6 md:px-8 h-[40px] md:h-[45px] text-sm md:text-base"
                >
                  Back
                </button>
              )}
              {currentStep < steps.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="bg-[#10EFFF] text-black rounded-full font-medium hover:bg-[#0DD4E8] transition-colors flex items-center justify-center w-[80px] md:w-[88px] h-[40px] md:h-[45px] gap-2 ml-auto text-sm md:text-base"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="bg-[#10EFFF] text-black rounded-full font-medium hover:bg-[#0DD4E8] transition-colors flex items-center justify-center px-6 md:px-8 h-[40px] md:h-[45px] ml-auto text-sm md:text-base"
                >
                  Submit
                </button>
              )}
            </div>
          </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
