import React from 'react';
import { RegionData } from '../../types/demographics';

interface ItalyMapProps {
  data: RegionData[];
}

export function ItalyMap({ data }: ItalyMapProps) {
  const maxCount = Math.max(...data.map(d => d.count));
  
  return (
    <div className="h-[300px] relative">
      <h4 className="text-base font-medium mb-4">Geographical Distribution</h4>
      <div className="relative h-full">
        <svg
          viewBox="0 0 100 120"
          className="w-full h-full absolute inset-0"
          style={{ filter: 'drop-shadow(0 1px 2px rgb(0 0 0 / 0.1))' }}
        >
          {/* Main peninsula */}
          <path
            d="M40,15 
               C42,12 48,12 50,15
               L52,18 C54,20 55,22 55,24
               L54,28 C53,30 53,32 54,34
               L55,38 C56,40 56,42 55,44
               L54,48 C53,50 53,52 54,54
               L55,58 C56,60 56,62 55,64
               L53,68 C52,70 52,72 53,74
               L54,78 C55,80 55,82 54,84
               L52,88 C50,90 48,92 46,94
               L44,96 C42,98 40,99 38,98
               L36,96 C34,94 33,92 33,90
               L34,86 C35,84 35,82 34,80
               L32,76 C31,74 31,72 32,70
               L34,66 C35,64 35,62 34,60
               L32,56 C31,54 31,52 32,50
               L34,46 C35,44 35,42 34,40
               L32,36 C31,34 31,32 32,30
               L34,26 C35,24 36,22 37,20
               L40,15"
            fill="#f3f4f6"
            stroke="#d1d5db"
            strokeWidth="0.5"
          />

          {/* Sicily */}
          <path
            d="M42,95
               C44,94 46,94 48,95
               C50,96 51,98 51,100
               C51,102 50,104 48,105
               C46,106 44,106 42,105
               C40,104 39,102 39,100
               C39,98 40,96 42,95"
            fill="#f3f4f6"
            stroke="#d1d5db"
            strokeWidth="0.5"
          />

          {/* Sardinia */}
          <path
            d="M22,45
               C24,44 26,44 28,45
               C30,46 31,48 31,50
               C31,54 30,58 28,62
               C26,63 24,63 22,62
               C20,58 19,54 19,50
               C19,48 20,46 22,45"
            fill="#f3f4f6"
            stroke="#d1d5db"
            strokeWidth="0.5"
          />

          {/* Coastline details - Adriatic */}
          <path
            d="M54,34 C55,35 55.5,36 55,37
               M54,54 C55,55 55.5,56 55,57
               M53,74 C54,75 54.5,76 54,77"
            fill="none"
            stroke="#d1d5db"
            strokeWidth="0.3"
          />

          {/* Coastline details - Tyrrhenian */}
          <path
            d="M32,50 C31,51 30.5,52 31,53
               M32,70 C31,71 30.5,72 31,73
               M34,86 C33,87 32.5,88 33,89"
            fill="none"
            stroke="#d1d5db"
            strokeWidth="0.3"
          />
        </svg>
        
        {/* Bubbles for each region */}
        {data.map((region) => {
          const size = (region.count / maxCount) * 25 + 8;
          
          // Adjusted coordinates to match the new SVG viewBox
          const coordinates = {
            'Lombardy': { x: 45, y: 25 },
            'Veneto': { x: 52, y: 28 },
            'Emilia-Romagna': { x: 48, y: 35 },
            'Tuscany': { x: 45, y: 45 },
            'Lazio': { x: 45, y: 60 },
            'Campania': { x: 48, y: 75 },
            'Sicily': { x: 45, y: 100 },
            'Sardinia': { x: 25, y: 53 }
          }[region.region];
          
          return (
            <div
              key={region.region}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 bg-indigo-500 rounded-full opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${coordinates.x}%`,
                top: `${coordinates.y}%`
              }}
              title={`${region.region}: ${region.count} users (${region.percentage}%)`}
            >
              <div className="absolute inset-0 animate-ping bg-indigo-400 rounded-full opacity-25" />
            </div>
          );
        })}
      </div>
    </div>
  );
}