import React from 'react'

const Bucket = () => {
  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <div className="bg-indigo-800 hover:text-red-500 text-white font-bold rounded-lg border shadow-lg p-10">
          This is dummy component
        </div>
      </div>
    </div>
  )
}

Bucket.propTypes = {}

export default React.memo(Bucket)
