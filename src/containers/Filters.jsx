'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { clearFilterstate, handleApplied, handleFilterState } from '../store/FilterSlice'
import { ListFilter } from "lucide-react"

export default function FilteringComponent() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  // const [filters, setFilters] = useState({
  //   location: '',
  //   address: '',
  //   type: '',
  //   rate: [0, 100],
  //   rating: ''
  // })

  const dispatch = useDispatch()
  const filters = useSelector((state) => state.filter.data)

  const handleFilterChange = (field, value) => {
    // setFilters(prev => ({ ...prev, [field]: value }))
    dispatch(handleFilterState({
      ...filters, [field]: value
    }))
  }

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen)
  }

  const submitFilter = () => {
    dispatch(handleApplied
      ()
    )
    setIsFilterOpen(!isFilterOpen)
  }


  const clearFilter = () => {
    dispatch(clearFilterstate())
  }

  return (
    <div className="relative p-4">
      {/* Filter Toggle Button */}
      <motion.button
        onClick={toggleFilter}
        className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full focus:outline-none"
        animate={{ rotate: isFilterOpen ? 45 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-xl font-bold">
          {isFilterOpen ? '✕' : <ListFilter className="w-6 h-6 text--blue-500" />}
        </span>
      </motion.button>

      {/* Filter Component */}
      {isFilterOpen && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="absolute z-50 top-12 left-0 right-0 bg-white p-6 shadow-lg rounded-lg space-y-4"
        >
          <div>
            <button
              onClick={clearFilter}
              className="mt-4 w-full bg-orange-400 text-white py-2 rounded-md hover:bg-orange-700"
            >
              clear filter
            </button>
          </div>
          {/* Location Filter */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 my-2">Location</label>
            <input
              id="location"
              type="text"
              placeholder="Enter location"
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="mt-1 block p-2 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          {/* Address Filter */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <input
              id="address"
              type="text"
              placeholder="Enter address"
              value={filters.address}
              onChange={(e) => handleFilterChange('address', e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <div className="flex space-x-4 mt-1">
              <label className="inline-flex items-center my-2">
                <input
                  type="radio"
                  name="type"
                  value=""
                  checked={filters.type === ""}
                  onChange={() => handleFilterChange("type", "")}
                  className="form-radio text-indigo-600 p-2"
                />
                <span className="ml-2">All</span>
              </label>
              <label className="inline-flex items-center my-2">
                <input
                  type="radio"
                  name="type"
                  value="yes"
                  checked={filters.type === "yes"}
                  onChange={() => handleFilterChange("type", "yes")}
                  className="form-radio text-indigo-600 p-2"
                />
                <span className="ml-2">Public</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="type"
                  value="no"
                  checked={filters.type === "no"}
                  onChange={() => handleFilterChange("type", "no")}
                  className="form-radio text-indigo-600"
                />
                <span className="ml-2">Private</span>
              </label>
            </div>
          </div>

          {/* Price Range Slider */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Price Range</label>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={filters.rate[1]}
              onChange={(e) => handleFilterChange('rate', [0, parseInt(e.target.value)])}
              className="mt-1 w-full"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>${filters.rate[0]}</span>
              <span>${filters.rate[1]}</span>
            </div>
          </div>

          {/* Rating Filter */}
          <div>
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Minimum Rating</label>
            <select
              id="rating"
              value={filters.rating}
              onChange={(e) => handleFilterChange('rating', e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Any</option>
              <option value="4.0">4.0+</option>
              <option value="4.5">4.5+</option>
              <option value="4.8">4.8+</option>
            </select>
          </div>

          {/* Apply Filters Button */}
          <button
            onClick={submitFilter}
            className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
          >
            Apply Filters
          </button>
        </motion.div>
      )}
    </div>
  )
}
