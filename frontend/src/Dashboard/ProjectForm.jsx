import { useDispatch, useSelector } from 'react-redux';
import { saveProjectWithMedia } from '../redux/dashbord-card-1/projectSlice';
import { UploadCloud, X, HelpCircle } from 'lucide-react';

const ALL_AMENITIES = [
  "Gymnasium",
  "Swimming Pool",
  "Sports Facility",
  "Indoor Games",
  "Children's Play Area",
  "Club House",
  "Cafeteria",
  "Rain Water Harvesting",
  "Intercom",
  "24 X 7 Security"
];

export default function ProjectForm({ isOpen, onClose, formData, setFormData, isEditing, existingId }) {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.projects);

  if (!isOpen) return null;

  const handleAmenityChange = (amenity) => {
    const current = formData.amenities || [];
    if (current.includes(amenity)) {
      setFormData({
        ...formData,
        amenities: current.filter(a => a !== amenity)
      });
    } else {
      setFormData({
        ...formData,
        amenities: [...current, amenity]
      });
    }
  };

  const cleanPrice = (price) => {
    if (!price) return "Price on request";
    let cleaned = price.trim();
    // Remove "Rs.", "Rs", "INR", "inr" (case insensitive)
    cleaned = cleaned.replace(/rs\.?|inr/ig, "").trim();
    // Ensure it starts with ₹
    if (!cleaned.startsWith("₹")) {
      cleaned = "₹ " + cleaned;
    }
    // Replace multiple spaces
    cleaned = cleaned.replace(/\s+/g, " ");
    return cleaned;
  };

  const removeExistingImage = (imgId) => {
    const existing = formData.existingCarousel || formData.carouselImages || [];
    const updated = existing.filter(img => img.id !== imgId);
    setFormData({
      ...formData,
      existingCarousel: updated,
      carouselImages: updated
    });
  };

  const removeStagedImage = (index) => {
    const staged = formData.carouselImagesFiles || [];
    const updated = staged.filter((_, idx) => idx !== index);
    setFormData({
      ...formData,
      carouselImagesFiles: updated
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedPrice = cleanPrice(formData.price);
    const updatedFormData = {
      ...formData,
      price: formattedPrice
    };

    dispatch(saveProjectWithMedia({ formData: updatedFormData, isEditing, existingId }))
      .unwrap()
      .then(() => {
        onClose();
      })
      .catch((err) => {
        console.error("Failed to save project:", err);
      });
  };

  const handleMultiImageTrack = (e) => {
    const files = Array.from(e.target.files);
    const mapped = files.map(file => ({ file, alt: file.name }));
    setFormData({
      ...formData,
      carouselImagesFiles: [...(formData.carouselImagesFiles || []), ...mapped]
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/70 backdrop-blur-sm p-4">
      <div className="bg-[#0B1329] border border-gray-800 w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl relative max-h-[92vh] flex flex-col text-white">
        
        {/* Header section layout */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 shrink-0">
          <h3 className="text-lg font-bold">
            {isEditing ? 'Modify Dynamic Listing & Content' : 'Publish New FastMoving Project & Page'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-800"><X size={18} /></button>
        </div>

        {error && (
          <div className="bg-red-950/60 border border-red-800 text-red-200 px-6 py-3 text-xs rounded-xl mx-6 mt-4 shrink-0 font-medium">
            ⚠️ {error}
          </div>
        )}

        {/* Input content scroll block wrapper */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto flex-1 custom-scrollbar text-sm">
          
          {/* SECTION A: CARD ELEMENTS */}
          <div className="border-b border-gray-800 pb-4">
            <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-3">Section A: Front Page Card Fields</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-400 uppercase">Project Title *</label>
                <input type="text" required placeholder="e.g. Godrej Varanya- Kharghar" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-orange-500 focus:outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-400 uppercase">Builder/Developer *</label>
                <input type="text" required placeholder="e.g. Hubtown Limited" value={formData.builder} onChange={e => setFormData({...formData, builder: e.target.value})} className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-orange-500 focus:outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-400 uppercase">Location *</label>
                <input type="text" required placeholder="e.g. Chembur, Mumbai" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-orange-500 focus:outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-400 uppercase">Route Subpath (Verbatim) *</label>
                <input type="text" required placeholder="e.g. /hubtown-seasons-ecuador" value={formData.route} onChange={e => setFormData({...formData, route: e.target.value})} className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-orange-500 focus:outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-400 uppercase">Pricing / Description Token</label>
                <input type="text" placeholder="e.g. Price on request or ₹ 9.61 Cr" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-orange-500 focus:outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-400 uppercase">Status Target</label>
                <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none cursor-pointer">
                  <option value="Under Construction">Under Construction</option>
                  <option value="Ready to Move">Ready to Move</option>
                  <option value="Newly Launched">Newly Launched</option>
                  <option value="Exclusive Collection">Exclusive Collection</option>
                  <option value="By Invitation Only">By Invitation Only</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-400 uppercase">Project Type / Page Section *</label>
                <select value={formData.projectType || 'fast-moving'} onChange={e => setFormData({...formData, projectType: e.target.value})} className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none cursor-pointer">
                  <option value="fast-moving">Fast Moving Projects</option>
                  <option value="exclusive">Exclusive Projects</option>
                  <option value="latest-launches">Latest Property Launches</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-400 uppercase">Configuration *</label>
                <input type="text" required placeholder="e.g. 1, 2, 3 BHK" value={formData.config || ''} onChange={e => setFormData({...formData, config: e.target.value})} className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-orange-500 focus:outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-400 uppercase">Builtup Area *</label>
                <input type="text" required placeholder="e.g. 453 - 884 sq ft" value={formData.area || ''} onChange={e => setFormData({...formData, area: e.target.value})} className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-orange-500 focus:outline-none" />
              </div>
            </div>
          </div>

          {/* SECTION B: EXTENSIVE OVERVIEW & INNER CONTENT (CentreParkContent) */}
          <div>
            <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-3">Section B: Overview Page Target Fields (CentreParkContent)</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div className="space-y-1">
                <label className="text-xs text-gray-400 uppercase">Possession Date string</label>
                <input type="text" placeholder="e.g. Nov'19" value={formData.possessionDate || ''} onChange={e => setFormData({...formData, possessionDate: e.target.value})} className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2.5 text-white focus:outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-400 uppercase">Total Launched Apts</label>
                <input type="text" placeholder="e.g. 2500" value={formData.totalApartments || ''} onChange={e => setFormData({...formData, totalApartments: e.target.value})} className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2.5 text-white focus:outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-400 uppercase">Launch Timeline</label>
                <input type="text" placeholder="e.g. Feb'17" value={formData.launchDate || ''} onChange={e => setFormData({...formData, launchDate: e.target.value})} className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2.5 text-white focus:outline-none" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs text-gray-400 uppercase">RERA ID Registry Numbers</label>
                <input type="text" placeholder="e.g. P51700000506, P51700000596" value={formData.reraId || ''} onChange={e => setFormData({...formData, reraId: e.target.value})} className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-400 uppercase block mb-1">Select Available Amenities</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-gray-900/60 p-4 rounded-xl border border-gray-700">
                  {ALL_AMENITIES.map((amenity) => {
                    const isChecked = (formData.amenities || []).includes(amenity);
                    return (
                      <label key={amenity} className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleAmenityChange(amenity)}
                          className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-0 cursor-pointer"
                        />
                        {amenity}
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-gray-400 uppercase">Detailed Description block</label>
                <textarea rows="3" placeholder="Write full analytical property summaries here..." value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 text-white focus:outline-none" />
              </div>
            </div>
          </div>

          {/* SECTION C: CLOUDINARY FILE TRACKS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-800 pt-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase">Primary Listing Card Image File</label>
              <div className="border border-dashed border-gray-700 hover:border-gray-600 rounded-2xl p-4 text-center bg-gray-900/40 relative cursor-pointer group">
                <input type="file" accept="image/*" onChange={e => setFormData({...formData, image: e.target.files[0]})} className="absolute inset-0 opacity-0 cursor-pointer" />
                <UploadCloud size={18} className="mx-auto mb-1 text-gray-400 group-hover:text-white" />
                <p className="text-xs text-gray-400 truncate">{formData.image ? (formData.image.name || 'Asset image live') : 'Upload Main Display Card'}</p>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase">Dynamic Inner Gallery Carousel Images (Multiple)</label>
              <div className="border border-dashed border-gray-700 hover:border-gray-600 rounded-2xl p-4 text-center bg-gray-900/40 relative cursor-pointer group">
                <input type="file" multiple accept="image/*" onChange={handleMultiImageTrack} className="absolute inset-0 opacity-0 cursor-pointer" />
                <UploadCloud size={18} className="mx-auto mb-1 text-gray-400 group-hover:text-white" />
                <p className="text-xs text-gray-400">{formData.carouselImagesFiles?.length > 0 ? `${formData.carouselImagesFiles.length} files tracked for cloud upload` : 'Add multi-gallery elements'}</p>
              </div>
            </div>
          </div>

          {/* Gallery Previews and Management */}
          {((formData.existingCarousel || formData.carouselImages || []).length > 0 || (formData.carouselImagesFiles || []).length > 0) && (
            <div className="space-y-2 border-t border-gray-800 pt-4">
              <label className="text-xs font-semibold text-gray-400 uppercase">Gallery Image Management</label>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 bg-gray-900/60 p-4 rounded-xl border border-gray-700 max-h-[220px] overflow-y-auto custom-scrollbar">
                
                {/* Render Existing Gallery Images */}
                {(formData.existingCarousel || formData.carouselImages || []).map((img) => (
                  <div key={img.id} className="relative aspect-video rounded-lg overflow-hidden border border-gray-800 bg-slate-950 group">
                    <img src={img.src} alt={img.alt || "Gallery"} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeExistingImage(img.id)}
                      className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 cursor-pointer shadow opacity-80 hover:opacity-100 transition-opacity z-20"
                      title="Remove Image"
                    >
                      <X size={10} />
                    </button>
                    <span className="absolute bottom-0 inset-x-0 bg-black/60 text-[9px] text-gray-300 py-0.5 text-center truncate">
                      Saved
                    </span>
                  </div>
                ))}

                {/* Render Staged Gallery Images */}
                {(formData.carouselImagesFiles || []).map((item, idx) => {
                  const objectUrl = item.file instanceof File ? URL.createObjectURL(item.file) : "";
                  return (
                    <div key={idx} className="relative aspect-video rounded-lg overflow-hidden border border-orange-500/30 bg-slate-950 group">
                      {objectUrl && <img src={objectUrl} alt={item.alt || "Staged"} className="w-full h-full object-cover" />}
                      <button
                        type="button"
                        onClick={() => removeStagedImage(idx)}
                        className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 cursor-pointer shadow opacity-80 hover:opacity-100 transition-opacity z-20"
                        title="Remove Staged Image"
                      >
                        <X size={10} />
                      </button>
                      <span className="absolute bottom-0 inset-x-0 bg-orange-600/80 text-[9px] text-white py-0.5 text-center truncate">
                        Staged
                      </span>
                    </div>
                  );
                })}

              </div>
            </div>
          )}

          {/* Execution Controls Panel footer */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-800 shrink-0">
            <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl border border-gray-700 hover:bg-gray-800 text-sm transition-colors">Cancel</button>
            <button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors shadow-lg shadow-blue-500/10">
              {isLoading ? 'Uploading to Media CDN...' : isEditing ? 'Update Listing Asset' : 'Publish Listing'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}