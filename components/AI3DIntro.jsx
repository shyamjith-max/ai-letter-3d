import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html, Float } from '@react-three/drei'
import { motion } from 'framer-motion'

export default function AI3DIntro() {
  const [stage, setStage] = useState('intro')
  const [selectedType, setSelectedType] = useState(null)
  const [selectedLang, setSelectedLang] = useState(null)
  const [selectedActor, setSelectedActor] = useState(null)

  return (
    <div style={{minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:24}}>
      <div style={{width:'100%', maxWidth:1200, height:720, borderRadius:20, overflow:'hidden', background:'rgba(0,0,0,0.35)', boxShadow:'0 20px 60px rgba(0,0,0,0.6)'}}>
        <Canvas camera={{ position:[0,0,7], fov:50 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5,5,5]} intensity={1} />
          <IntroScene
            stage={stage} setStage={setStage}
            selectedType={selectedType} setSelectedType={setSelectedType}
            selectedLang={selectedLang} setSelectedLang={setSelectedLang}
            selectedActor={selectedActor} setSelectedActor={setSelectedActor}
          />
        </Canvas>
        <div style={{position:'absolute', left:24, bottom:24}}>
          <button onClick={() => { setStage('intro'); setSelectedType(null); setSelectedLang(null); setSelectedActor(null); }} style={{padding:'10px 16px', borderRadius:10, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.08)'}}>Reset</button>
        </div>
      </div>
    </div>
  )
}

function IntroScene({ stage, setStage, selectedType, setSelectedType, selectedLang, setSelectedLang, selectedActor, setSelectedActor }) {
  const pushRef = useRef()
  useFrame((state, delta) => {
    if (pushRef.current) pushRef.current.rotation.y += delta * 0.08
  })

  return (
    <>
      <Float floatIntensity={1.2} rotationIntensity={0.2} speed={1}>
        <mesh ref={pushRef} position={[0,2.6,0]}>
          <textGeometry args={['HELLO SWITEE, WHAT\'S THE SPECIAL DAY?', { size:0.5, height:0.05 }]} />
        </mesh>
      </Float>

      <group position={[0,0,0]}>
        <Float position={[0,0,0]} floatIntensity={0.6}>
          <Card3D label='BIRTHDAY' x={-2} colorTop='#b8860b' colorBottom='#4b134f' />
          <Card3D label='LOVE' x={0} colorTop='#ff4d6d' colorBottom='#8b1e3f' />
          <Card3D label='MARRIAGE' x={2} colorTop='#1f3b5f' colorBottom='#a02e2e' />
        </Float>
      </group>

      <Html position={[0,-2.5,0]} center>
        <OverlayUI stage={stage} setStage={setStage}
          selectedType={selectedType} setSelectedType={setSelectedType}
          selectedLang={selectedLang} setSelectedLang={setSelectedLang}
          selectedActor={selectedActor} setSelectedActor={setSelectedActor} />
      </Html>

      <Avatar position={[-3,-1,0]} />
      <OrbitControls enableZoom={false} enablePan={false} />
    </>
  )
}

function Card3D({ label, x=0, colorTop='#fff', colorBottom='#000' }) {
  return (
    <group position={[x,0,0]}>
      <mesh castShadow>
        <boxGeometry args={[1.6,2.4,0.25]} />
        <meshStandardMaterial metalness={0.7} roughness={0.15} color={colorTop} />
      </mesh>
      <Html position={[0,-1.2,0.25]} center>
        <div style={{width:150, textAlign:'center', padding:12, borderRadius:14, background:`linear-gradient(180deg, ${colorTop}, ${colorBottom})`, boxShadow:'0 8px 30px rgba(0,0,0,0.6)'}}>
          <h3 style={{color:'#fff', fontWeight:700}}>{label}</h3>
        </div>
      </Html>
    </group>
  )
}

// Simple stylized avatar built from primitives (sphere head, cylinder body, hair)
function Avatar(props) {
  const ref = useRef()
  useFrame((state, delta) => {
    if (ref.current) ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.12
  })
  return (
    <group ref={ref} {...props} scale={[0.9,0.9,0.9]}>
      {/* Head */}
      <mesh position={[0,1.25,0]}>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshStandardMaterial color={'#ffdbcc'} metalness={0.1} roughness={0.6} />
      </mesh>
      {/* Hair */}
      <mesh position={[0,1.4,0.12]}>
        <sphereGeometry args={[0.47, 32, 32]} />
        <meshStandardMaterial color={'#2b1b2e'} metalness={0.2} roughness={0.6} />
      </mesh>
      {/* Body */}
      <mesh position={[0,0.3,0]}>
        <cylinderGeometry args={[0.38,0.5,1.2,24]} />
        <meshStandardMaterial color={'#6b2a4a'} metalness={0.2} roughness={0.5} />
      </mesh>
      {/* Left arm */}
      <mesh position={[-0.6,0.6,0]}>
        <cylinderGeometry args={[0.08,0.08,0.9,12]} />
        <meshStandardMaterial color={'#ffdbcc'} />
      </mesh>
      {/* Right arm - animated as pushing */}
      <group position={[0.6,0.9,0]} rotation={[ -0.6, 0, 0.2 ]}>
        <mesh position={[0,-0.3,0]}>
          <cylinderGeometry args={[0.08,0.08,0.9,12]} />
          <meshStandardMaterial color={'#ffdbcc'} />
        </mesh>
      </group>
    </group>
  )
}

function OverlayUI({ stage, setStage, selectedType, setSelectedType, selectedLang, setSelectedLang, selectedActor, setSelectedActor }) {
  return (
    <div style={{width:880, maxWidth:'100%', margin:'0 auto', textAlign:'center', pointerEvents:'auto'}}>
      {stage === 'intro' && (
        <motion.div initial={{ y:-40, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ duration:0.8 }}>
          <div style={{display:'flex', gap:18, justifyContent:'center'}}>
            <button onClick={() => { setStage('chooseLang'); setSelectedType('BIRTHDAY'); }} style={{padding:'12px 20px', borderRadius:20, fontSize:18, fontWeight:700, boxShadow:'0 10px 30px rgba(0,0,0,0.6)', background:'linear-gradient(90deg,#ffd700,#b76e79)'}}>BIRTHDAY</button>
            <button onClick={() => { setStage('chooseLang'); setSelectedType('LOVE'); }} style={{padding:'12px 20px', borderRadius:20, fontSize:18, fontWeight:700, boxShadow:'0 10px 30px rgba(0,0,0,0.6)', background:'linear-gradient(90deg,#ff9a9e,#fecfef)'}}>LOVE</button>
            <button onClick={() => { setStage('chooseLang'); setSelectedType('MARRIAGE'); }} style={{padding:'12px 20px', borderRadius:20, fontSize:18, fontWeight:700, boxShadow:'0 10px 30px rgba(0,0,0,0.6)', background:'linear-gradient(90deg,#8a2387,#e94057)'}}>MARRIAGE</button>
          </div>
        </motion.div>
      )}

      {stage === 'chooseLang' && (
        <motion.div initial={{ scale:0.9, opacity:0 }} animate={{ scale:1, opacity:1 }} transition={{ duration:0.6 }}>
          <div style={{marginTop:18, display:'inline-block', padding:20, borderRadius:18, background:'rgba(255,255,255,0.03)'}}>
            <h2 style={{color:'#fff', fontSize:20, marginBottom:12}}>WHAT LANGUAGE YOU PREFER?</h2>
            <div style={{display:'flex', gap:12, justifyContent:'center'}}>
              <button onClick={() => { setSelectedLang('MALAYALAM'); setStage('chooseActor'); }} style={{padding:'10px 14px', borderRadius:10}}>MALAYALAM</button>
              <button onClick={() => { setSelectedLang('ENGLISH'); setStage('chooseActor'); }} style={{padding:'10px 14px', borderRadius:10}}>ENGLISH</button>
              <button onClick={() => { setSelectedLang('HINDI'); setStage('chooseActor'); }} style={{padding:'10px 14px', borderRadius:10}}>HINDI</button>
            </div>
          </div>
        </motion.div>
      )}

      {stage === 'chooseActor' && (
        <motion.div initial={{ y:40, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ duration:0.6 }}>
          <div style={{marginTop:18, display:'inline-block', padding:20, borderRadius:18, background:'rgba(0,0,0,0.55)'}}>
            <h2 style={{color:'#fff', fontSize:20, marginBottom:12}}>WHICH ACTOR DO YOU PREFER?</h2>
            <div style={{display:'flex', gap:20, justifyContent:'center', alignItems:'center'}}>
              {getActorsForLang(selectedLang).map(a => (
                <div key={a.id} style={{display:'flex', flexDirection:'column', alignItems:'center', cursor:'pointer'}} onClick={() => { setSelectedActor(a); setStage('actorSelected'); }}>
                  <img src={a.img} alt={a.name} style={{width:90, height:90, borderRadius:999, objectFit:'cover', border:'4px solid rgba(255,255,255,0.1)'}} />
                  <div style={{marginTop:8, color:'#fff', fontWeight:600}}>{a.name}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {stage === 'actorSelected' && selectedActor && (
        <motion.div initial={{ scale:0.9, opacity:0 }} animate={{ scale:1, opacity:1 }} transition={{ duration:0.45 }}>
          <div style={{marginTop:18, display:'inline-block', padding:18, borderRadius:14, background:'linear-gradient(90deg, rgba(0,0,0,0.6), rgba(0,0,0,0.4))'}}>
            <h3 style={{color:'#fff'}}>{`Selected: ${selectedActor.name} (${selectedLang})`}</h3>
            <p style={{color:'#ddd', marginTop:8}}>Next: we can generate a 10s message in their voice & language. For now a placeholder face + flow is provided.</p>
            <div style={{marginTop:10}}>
              <button onClick={() => alert('Generate placeholder: requires API integration')} style={{padding:'8px 12px', borderRadius:10, marginRight:8}}>Generate 10s</button>
              <button onClick={() => setStage('intro')} style={{padding:'8px 12px', borderRadius:10}}>Back</button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

function getActorsForLang(lang) {
  const data = {
    MALAYALAM: [
      { id:'dul', name:'Dulquer Salmaan', img:'/images/dulquer.png' },
      { id:'mohan', name:'Mohanlal', img:'/images/mohanlal.png' },
      { id:'mamm', name:'Mammootty', img:'/images/mammootty.png' }
    ],
    ENGLISH: [
      { id:'scar', name:'Scarlett Johansson', img:'/images/scarlett.png' },
      { id:'leo', name:'Leonardo DiCaprio', img:'/images/leo.png' },
      { id:'tom', name:'Tom Cruise', img:'/images/tom.png' }
    ],
    HINDI: [
      { id:'amit', name:'Amitabh Bachchan', img:'/images/amitabh.png' },
      { id:'sal', name:'Salman Khan', img:'/images/salman.png' },
      { id:'alia', name:'Alia Bhatt', img:'/images/alia.png' }
    ]
  }
  return data[lang] || []
}
