import { UploadCloud, X } from 'lucide-react';

export default function ProjectForm({ isOpen, onClose, onSubmit, formData, setFormData, isEditing }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/70 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-[#0B1329] border border-gray-800 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
        
        {/* Header Layout */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 shrink-0">
          <h3 className="text-lg font-bold text-white">
            {isEditing ? 'Modify Project Listing' : 'Add New FastMoving Project'}
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-800/50 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Inputs Container */}
        <form onSubmit={onSubmit} className="p-6 space-y-4 overflow-y-auto flex-1 custom-scrollbar">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Project Title *</label>
              <input 
                type="text" required placeholder="e.g. Tulsi Sahyadri- Panvel" value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full text-sm bg-gray-900/60 border border-gray-700/60 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Builder/Developer *</label>
              <input 
                type="text" required placeholder="e.g. L And T Realty" value={formData.builder}
                onChange={(e) => setFormData({ ...formData, builder: e.target.value })}
                className="w-full text-sm bg-gray-900/60 border border-gray-700/60 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Location / Suburb</label>
              <input 
                type="text" placeholder="e.g. Parel, Mumbai" value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full text-sm bg-gray-900/60 border border-gray-700/60 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Custom Navigation Route</label>
              <input 
                type="text" placeholder="e.g. /hubtown-seasons-ecuador" value={formData.route}
                onChange={(e) => setFormData({ ...formData, route: e.target.value })}
                className="w-full text-sm bg-gray-900/60 border border-gray-700/60 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Status Badge</label>
              <select 
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full text-sm bg-gray-900/60 border border-gray-700/60 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors cursor-pointer"
              >
                <option value="Ready to Move">Ready to Move</option>
                <option value="Under Construction">Under Construction</option>
                <option value="Newly Launched">Newly Launched</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Configuration Set</label>
              <input 
                type="text" placeholder="e.g. 2,3,4 BHK Apartment" value={formData.config}
                onChange={(e) => setFormData({ ...formData, config: e.target.value })}
                className="w-full text-sm bg-gray-900/60 border border-gray-700/60 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Built Area Metrics</label>
              <input 
                type="text" placeholder="e.g. Area on request" value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                className="w-full text-sm bg-gray-900/60 border border-gray-700/60 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Price Description Target</label>
            <input 
              type="text" placeholder="e.g. Price on request" value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full text-sm bg-gray-900/60 border border-gray-700/60 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>

          {/* Banner Upload Field Component */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Project Showcase Banner</label>
            <div className="border-2 border-dashed border-gray-700 hover:border-gray-600 rounded-2xl p-5 transition-colors bg-gray-900/20 flex flex-col items-center justify-center text-center group cursor-pointer relative">
              <input 
                type="file" accept="image/*"
                onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="w-10 h-10 rounded-xl bg-gray-800/40 flex items-center justify-center text-gray-400 group-hover:text-white mb-2 transition-colors">
                <UploadCloud size={20} />
              </div>
              <p className="text-xs font-bold text-gray-300 uppercase tracking-wider">Banner Image</p>
              <p className="text-[11px] text-gray-500 mt-0.5">
                {formData.image ? (typeof formData.image === 'string' ? 'Current Asset Tracked' : formData.image.name) : 'Drag & drop image file or browse system local storage'}
              </p>
            </div>
          </div>

          {/* Execution controls */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-800 shrink-0">
            <button
              type="button" onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800/40 text-sm font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-900 text-gray-950 font-bold px-6 py-2.5 rounded-xl text-sm transition-colors shadow-lg shadow-[#A3E635]/10"
            >
              {isEditing ? 'Update Details' : 'Publish Listing'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}