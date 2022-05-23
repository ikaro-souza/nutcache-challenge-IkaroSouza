import logo from 'assets/img/logo.png'
import React from 'react'
import { ContentContainer } from '../../common/components/ContentContainer'
import { EmployeesTable } from '../components'

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <header>
        <ContentContainer>
          <div className="flex flex-col items-center justify-center py-4">
            <div className="max-w-xs mb-4">
              <img src={logo} alt="nutcache employees management" />
            </div>
            <h1 className="font-medium text-xl md:text-2xl">
              Employees management
            </h1>
          </div>
        </ContentContainer>
      </header>
      <main className="flex-1 py-8">
        <ContentContainer>
          <EmployeesTable />
        </ContentContainer>
      </main>
    </div>
  )
}
