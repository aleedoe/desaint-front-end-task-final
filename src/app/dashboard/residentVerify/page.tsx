import React from 'react'

const Page = () => {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <h1>Resident Verify page</h1>
            {Array.from({ length: 24 }).map((_, index) => (
                <div
                    key={index}
                    className="aspect-video h-12 w-full rounded-lg bg-muted/50"
                />
            ))}
        </div>
    )
}

export default Page