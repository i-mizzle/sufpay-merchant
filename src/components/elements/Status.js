import React from 'react'

const Status = ({status}) => {
  return (<>
    {status === "IN_EVALUATION" &&
        <span className="px-2 py-1 rounded text-blue-600 font-medium bg-blue-400 bg-opacity-10 text-xs">
            {/* <Circle width={15} /> */}
            In evaluation
        </span>
    }
    {status === "IN_PROGRESS" &&
        <span className="px-2 py-1 rounded text-blue-600 font-medium bg-blue-400 bg-opacity-10 text-xs">
            {/* <Circle width={15} /> */}
            In progress
        </span>
    }
    {status === "DONE" &&
        <span className="px-2 py-1 rounded text-green-600 font-medium bg-green-400 bg-opacity-10 block text-xs">
            {/* <CheckIcon /> */}
            Done
        </span>
    }
    {status === "JOINED" &&
        <span className="px-2 py-1 rounded text-green-600 font-medium bg-green-400 bg-opacity-10 block text-xs">
            {/* <CheckIcon /> */}
            Joined
        </span>
    }
    {status === "SUCCESSFUL" &&
        <span className="px-2 py-1 rounded text-green-600 font-medium bg-green-400 bg-opacity-10 block text-xs">
            {/* <CheckIcon /> */}
            Successful
        </span>
    }
    {status === "SIGNED_OFF" &&
        <span className="px-2 py-1 rounded text-green-600 font-medium bg-green-400 bg-opacity-10 block text-xs">
            {/* <CheckIcon /> */}
            Signed off
        </span>
    }
    {status === "APPROVED" &&
        <span className="px-2 py-1 rounded text-green-600 font-medium bg-green-400 bg-opacity-10 block text-xs">
            {/* <CheckIcon /> */}
            Signed off
        </span>
    }
    {status === "IN_REVIEW" &&
        <span className="px-2 py-1 rounded text-yellow-600 bg-yellow-200 bg-opacity-20 block text-xs">
            {/* <CloseIcon width={22} /> */}
            In review
        </span>
    }
    {status === "FAILED" &&
        <span className="px-2 py-1 rounded text-red-600 bg-red-200 bg-opacity-20 block text-xs">
            {/* <CloseIcon width={22} /> */}
            Failed
        </span>
    }
    {status === "BACKLOG" &&
        <span className="px-2 py-1 rounded text-gray-600 bg-gray-400 bg-opacity-10 block text-xs">
            {/* <CloseIcon width={22} /> */}
            Backlog
        </span>
    }
    {status === "PENDING" &&
        <span className="px-2 py-1 rounded text-gray-600 bg-gray-400 bg-opacity-10 block text-xs">
            {/* <CloseIcon width={22} /> */}
            Pending
        </span>
    }
    {status === "SUBMITTED" &&
        <span className="px-2 py-1 rounded text-gray-600 bg-gray-400 bg-opacity-10 block text-xs">
            {/* <CloseIcon width={22} /> */}
            Submitted
        </span>
    }
</>
  )
}

export default Status