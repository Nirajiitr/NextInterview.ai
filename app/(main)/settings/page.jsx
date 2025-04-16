"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  LogOut, 
  UserX, 
  Save, 
  X, 
  KeyRound, 
  Mail, 
  Lock, 
  Image, 
  Globe 
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

const UserSetting = () => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  
  // Instead of using Next.js router, we'll use a function that simulates navigation
  const handleLogout = () => {
    // In a real app, this would handle logout logic
    console.log("Logging out...")
    // For demo purposes, we'll just alert the user
    alert("You have been logged out")
    // In a real app without Next.js, you could use:
    // window.location.href = '/'
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">User Settings</h1>
        <p className="text-gray-500">Manage your account preferences and settings</p>
      </div>

      <Tabs defaultValue="account" className="w-full ">
        <TabsList className="grid grid-cols-3 mb-8 bg-blue-100">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account details and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
              
              <Button 
                variant="destructive" 
                className="w-full justify-start"
                onClick={() => setShowDeleteAlert(!showDeleteAlert)}
              >
                <UserX className="mr-2 h-4 w-4" />
                Delete Account
              </Button>
              
              {showDeleteAlert && (
                <Alert variant="destructive" className="mt-4">
                  <AlertTitle>Warning</AlertTitle>
                  <AlertDescription>
                    This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                    <div className="flex gap-2 mt-4">
                      <Button variant="destructive" size="sm" onClick={() => setShowDeleteAlert(false)}>
                        Confirm Delete
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setShowDeleteAlert(false)}>
                        Cancel
                      </Button>
                    </div>
                  </AlertDescription>
                </Alert>
              )}
              
              <Button className="w-full justify-start" variant="outline">
                <Mail className="mr-2 h-4 w-4" />
                Change Email
              </Button>
              
              <Button className="w-full justify-start" variant="outline">
                <Image className="mr-2 h-4 w-4" />
                Change Profile Picture
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your security preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-start" variant="outline">
                <KeyRound className="mr-2 h-4 w-4" />
                Reset Password
              </Button>
              
              <Button className="w-full justify-start" variant="outline">
                <Lock className="mr-2 h-4 w-4" />
                Change Password
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Preference Settings</CardTitle>
              <CardDescription>
                Customize your experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-start" variant="outline">
                <Globe className="mr-2 h-4 w-4" />
                Change Language
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex gap-4 mt-8">
        <Button className="flex-1">
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
        <Button variant="outline" className="flex-1">
          <X className="mr-2 h-4 w-4" />
          Cancel
        </Button>
      </div>
    </div>
  )
}

export default UserSetting