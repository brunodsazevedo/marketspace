import React from 'react'
import { Redirect } from 'expo-router'

export default function HomeApp() {
  return (
    <Redirect href="/sign-in" />
  );
}
