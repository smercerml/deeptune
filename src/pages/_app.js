import '@component/styles/globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { QueryClient, QueryClientProvider } from 'react-query'
import React from 'react'
import { dark } from '@clerk/themes'
import { Karla, Montserrat } from 'next/font/google'

const karla = Karla({
    subsets: ['latin'],
    variable: '--karla',
})
const montserrat = Montserrat({
    subsets: ['latin'],
    variable: '--montserrat',
})

export default function App({ Component, pageProps }) {
    const [queryClient] = React.useState(() => new QueryClient())
    return (
        <main
            className={`${karla.variable} font-heading ${montserrat.variable} font-body`}
        >
            <QueryClientProvider client={queryClient}>
                <ClerkProvider
                    /* style auth modals */
                    appearance={{
                        baseTheme: dark,
                        elements: {
                            rootBox: {
                                fontFamily: 'Montserrat, sans-serif',
                            },
                            card: 'bg-gray-900',
                            headerTitle: 'text-white opacity-het',
                            headerSubtitle: 'text-white opacity-met',
                            modalCloseButton:
                                'text-tertiary text-opacity-het hover:text-opacity-100 bg-transparent hover:bg-transparent',
                            headerBackLink: 'hidden',
                            headerBackIcon:
                                'text-primary opacity-het hover:opacity-100 hover:outline-none',
                            formFieldLabel: 'text-white opacity-het',
                            formFieldInput:
                                'bg-white bg-opacity-e1 border-white border-opacity-e5 text-opacity-met focus:ring-0 focus:border-opacity-met',
                            formFieldInputShowPasswordButton:
                                'text-white opacity-e6 hover:text-white hover:opacity-e8 focus:ring-0',
                            formFieldAction:
                                'text-secondary hover:text-secondary opacity-het hover:opacity-100 hover:no-underline',
                            formButtonPrimary:
                                'rounded-lg bg-gradient-to-r from-primary via-secondary to-tertiary animate-button text-black text-opacity-het capitalize opacity-het hover:opacity-100',
                            otpCodeFieldInput:
                                'focus:border-tertiary focus:ring-0 text-white text-opacity-het bg-white bg-opacity-e6',
                            formResendCodeLink:
                                'text-primary opacity-het hover:opacity-100 hover:no-underline',
                            footerActionText: 'text-white opacity-met',
                            footerActionLink:
                                'text-secondary hover:text-secondary opacity-het hover:opacity-100 hover:no-underline',
                            identityPreviewEditButton:
                                'text-primary hover:text-primary opacity-het hover:opacity-100',
                        },
                    }}
                    {...pageProps}
                >
                    <Component {...pageProps} />
                </ClerkProvider>
            </QueryClientProvider>
        </main>
    )
}
