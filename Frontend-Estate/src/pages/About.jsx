import React from 'react'
export default function About() {
  return (
    <>    
    <title>About</title>
      <div className='m-auto max-w-6xl py-24 px-5'>
        <h1 className='text-3xl font-semibold py-8 text-emerald-600'>About Hassan Jan</h1>
        <div className='flex flex-col sm:flex-row'>
          <div>
            <p className='py-5 text-slate-600'>I am a Software Engineering student at Superior University, currently studying in my 5th semester. I am passionate about web development and continuously improving my technical skills. I specialize in the MERN Stack, including MongoDB, Express.js, React.js, and Node.js. I enjoy building responsive, user-friendly, and scalable web applications.</p>
            <p className='text-slate-600'>I am constantly exploring new tools and techniques to improve my development skills. I believe in continuous learning and professional growth. My goal is to become a skilled full-stack software engineer and contribute to impactful projects. I am excited to take on new challenges that help me expand my knowledge and experience.</p>
          </div>
            <img className='h-60' src="public/about.png" alt="" />
        </div>
      </div>
    </>

  )
}
