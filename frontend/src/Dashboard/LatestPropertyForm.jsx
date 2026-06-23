import { UploadCloud, X } from 'lucide-react';

export default function LatestPropertyForm({ isOpen, onClose, onSubmit, formData, setFormData, isEditing }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/70 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white border border-slate-200 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
        
        {/* Header Layout */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 shrink-0">
          <h3 className="text-lg font-bold text-slate-900">
            {isEditing ? 'Modify Launch Profile' : 'Register Latest Property Launch'}
          </h3>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Inputs Container */}
        <form onSubmit={onSubmit} className="p-6 space-y-4 overflow-y-auto flex-1 custom-scrollbar bg-white">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Property Name / Title *</label>
              <input 
                type="text" required placeholder="e.g. Godrej Horizon Tower" value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Builder Group *</label>
              <input 
                type="text" required placeholder="e.g. Godrej Properties" value={formData.builder}
                onChange={(e) => setFormData({ ...formData, builder: e.target.value })}
                className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Location Status</label>
              <input 
                type="text" placeholder="e.g. Wadala, Mumbai" value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Custom Web Subroute</label>
              <input 
                type="text" placeholder="e.g. /godrej-horizon-wadala" value={formData.route}
                onChange={(e) => setFormData({ ...formData, route: e.target.value })}
                className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Launch Stage Tag</label>
              <select 
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-600 transition-colors cursor-pointer"
              >
                <option value="Newly Launched">Newly Launched</option>
                <option value="Pre-Launch Phase">Pre-Launch Phase</option>
                <option value="Under Construction">Under Construction</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Configurations Offered</label>
              <input 
                type="text" placeholder="e.g. 2,3 BHK Luxury Apartments" value={formData.config}
                onChange={(e) => setFormData({ ...formData, config: e.target.value })}
                className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Super Builtup Area</label>
              <input 
                type="text" placeholder="e.g. Area on request" value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Price Point Description</label>
            <input 
              type="text" placeholder="e.g. Price on request" value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-colors"
            />
          </div>

          {/* Banner Upload Field Component */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Launch Showcase Banner</label>
            <div className="border-2 border-dashed border-slate-200 hover:border-slate-300 rounded-2xl p-5 transition-colors bg-slate-50 flex flex-col items-center justify-center text-center group cursor-pointer relative">
              <input 
                type="file" accept="image/*"
                onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-blue-700 transition-colors shadow-sm">
                <UploadCloud size={20} />
              </div>
              <p className="text-xs font-bold text-slate-700 pt-2 uppercase tracking-wider">Banner Image Asset</p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {formData.image ? (typeof formData.image === 'string' ? 'Current Active Asset Linked' : formData.image.name) : 'Drag & drop image file or browse system local storage'}
              </p>
            </div>
          </div>

          {/* Execution controls */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 shrink-0">
            <button
              type="button" onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 text-sm font-medium transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors shadow-md shadow-blue-700/10 cursor-pointer"
            >
              {isEditing ? 'Update Launch Info' : 'Publish Launch'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}