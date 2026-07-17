import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Plus, Pencil, Trash2, MapPin, Building2, Home, Maximize2 } from 'lucide-react';
import { fetchProjects, deleteProject, saveProjectWithMedia } from '../redux/dashbord-card-1/projectSlice';
import ProjectForm from './ProjectForm'; // Imports the common project form layout

export default function ExclusiveProjects() {
  const dispatch = useDispatch();
  const { listings, isLoading } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const exclusives = listings.filter(p => p.projectType === 'exclusive');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExclusive, setEditingExclusive] = useState(null);
  const [formData, setFormData] = useState({
    route: '', status: 'Exclusive Collection', title: '', location: '', price: '', 
    config: '', area: '', builder: '', image: null, carouselImages: [], amenities: [],
    projectType: 'exclusive'
  });

  const handleOpenAdd = () => {
    setEditingExclusive(null);
    setFormData({
      route: '', status: 'Exclusive Collection', title: '', location: '', price: '', 
      config: '', area: '', builder: '', image: null, carouselImages: [],
      possessionDate: '', reraId: '', totalApartments: '', launchDate: '',
      availability: 'New and Resale', features: '', description: '', floorPlans: {},
      amenities: [], projectType: 'exclusive'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project) => {
    setEditingExclusive(project);
    setFormData({ 
      ...project, 
      existingCarousel: project.carouselImages, 
      carouselImages: [],
      amenities: project.amenities || [],
      projectType: 'exclusive'
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Confirm deletion of this premium exclusive property listing?")) {
      dispatch(deleteProject(id));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(saveProjectWithMedia({
      formData: { ...formData, projectType: 'exclusive' },
      isEditing: !!editingExclusive,
      existingId: editingExclusive?.id
    }));
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 text-slate-800 p-3 sm:p-4 min-h-screen bg-white">

      {/* Structural Workspace Banner Head */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-black">
            Exclusive Projects Collection
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Control live tracking display entries for elite, high-value signature developments.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-5 py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 shadow-md cursor-pointer w-full sm:w-auto"
        >
          <Plus size={18} strokeWidth={2.5} /> Add Exclusive
        </button>
      </div>

      {/* Property Display Array Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {exclusives.map((project) => (
          <div key={project.id} className="bg-gray-200 border border-slate-200 rounded-3xl overflow-hidden shadow-md flex flex-col group hover:shadow-xl hover:border-blue-400/50 transition-all duration-300 relative">

            {/* Top accent design border bar */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-blue-700 opacity-40 group-hover:opacity-100 transition-opacity" />

            {/* Asset image frame setup */}
            <div className="h-40 sm:h-48 w-full relative overflow-hidden bg-slate-100">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-white/95 backdrop-blur-md text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 text-blue-700 border border-blue-200 rounded-xl shadow-sm">
                {project.status}
              </div>
            </div>

            {/* Meta Data Context Rows */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3 sm:space-y-4 bg-white">
              <div className="space-y-2.5 sm:space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-1.5">
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold">
                    <Building2 size={14} className="text-blue-700" />
                    <span>{project.builder}</span>
                  </div>
                  <span className="text-[10px] bg-slate-100 font-mono font-bold text-blue-700 px-2 py-0.5 rounded-md border border-slate-200">
                    {project.route}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-snug group-hover:text-blue-700 transition-colors">
                  {project.title}
                </h3>

                <div className="flex items-center gap-1 text-slate-500 text-xs font-medium">
                  <MapPin size={13} className="text-blue-700" />
                  <span>{project.location}</span>
                </div>

                {/* Specification grids indicators */}
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3 pt-1">
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 space-y-0.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Layout Type</span>
                    <div className="flex items-center gap-1.5 text-slate-700 text-xs font-semibold truncate">
                      <Home size={12} className="text-blue-700 shrink-0" />
                      {project.config}
                    </div>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 space-y-0.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Super Area</span>
                    <div className="flex items-center gap-1.5 text-slate-700 text-xs font-semibold truncate">
                      <Maximize2 size={12} className="text-blue-700 shrink-0" />
                      {project.area}
                    </div>
                  </div>
                </div>
              </div>

              {/* Functional Controls Interface */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-200 flex-wrap gap-2">
                <span className={`font-extrabold text-sm sm:text-base bg-gradient-to-r ${project.priceColor} bg-clip-text text-transparent`}>
                  {project.price}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(project)}
                    className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-blue-700 border border-slate-200 rounded-xl transition-all duration-200 cursor-pointer"
                    title="Edit Entry"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-2 bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-600 border border-red-200 rounded-xl transition-all duration-200 cursor-pointer"
                    title="Delete Entry"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Renders the child Modal component linking to ProjectForm */}
      <ProjectForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
        setFormData={setFormData}
        isEditing={!!editingExclusive}
        existingId={editingExclusive?.id}
      />
    </div>
  );
}