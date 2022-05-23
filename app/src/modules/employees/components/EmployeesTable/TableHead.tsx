import React from 'react'
import { TableHeader } from './TableHeader'
import { TableRow } from './TableRow'

export const TableHead: React.FC = () => {
  return (
    <thead>
      <TableRow className="h-12">
        <TableHeader>Name</TableHeader>
        <TableHeader>Birth Date</TableHeader>
        <TableHeader>Gender</TableHeader>
        <TableHeader>Email</TableHeader>
        <TableHeader>CPF</TableHeader>
        <TableHeader>Start Date</TableHeader>
        <TableHeader>Team</TableHeader>
        <TableHeader aria-label="actions"></TableHeader>
      </TableRow>
    </thead>
  )
}
