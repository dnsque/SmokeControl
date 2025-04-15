const SmokingTrends: React.FC = () => {

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Rūkymo tendencijos per laiką</h2>
        
        <div className="bg-base-200 rounded-box p-4 my-2">
          <div className="flex items-center justify-end space-x-2 mb-2">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-primary rounded-full mr-1"></div>
              <span className="text-xs">Lietuva</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-secondary rounded-full mr-1"></div>
              <span className="text-xs">ES vidurkis</span>
            </div>
          </div>
          
          <div className="grid grid-cols-[auto_1fr] gap-2 items-end">
            {/* Y-axis labels */}
            <div className="flex flex-col justify-between h-40 text-xs text-right pr-1">
              <span>30%</span>
              <span>25%</span>
              <span>20%</span>
              <span>15%</span>
              <span>10%</span>
              <span>5%</span>
              <span>0%</span>
            </div>
            
            {/* Chart */}
            <div className="grid grid-cols-8 gap-1 h-40 relative">
              {/* Horizontal guide lines */}
              <div className="absolute w-full h-px bg-base-content opacity-10" style={{ bottom: '0%' }}></div>
              <div className="absolute w-full h-px bg-base-content opacity-10" style={{ bottom: '20%' }}></div>
              <div className="absolute w-full h-px bg-base-content opacity-10" style={{ bottom: '40%' }}></div>
              <div className="absolute w-full h-px bg-base-content opacity-10" style={{ bottom: '60%' }}></div>
              <div className="absolute w-full h-px bg-base-content opacity-10" style={{ bottom: '80%' }}></div>
              <div className="absolute w-full h-px bg-base-content opacity-10" style={{ bottom: '100%' }}></div>
              
              {/* Bars */}
            </div>
          </div>
          
          {/* X-axis labels */}
          <div className="grid grid-cols-8 gap-1 text-xs text-center mt-1">
          </div>
        </div>
        
        <p className="text-sm mt-2">
          Duomenys rodo, kad Lietuvoje rūkymo paplitimas yra aukštesnis nei ES vidurkis, tačiau stebima mažėjimo tendencija.
        </p>
      </div>
    </div>
  );
};

export default SmokingTrends; 