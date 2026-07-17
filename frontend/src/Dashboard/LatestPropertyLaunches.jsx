import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Plus, Pencil, Trash2, MapPin, Building2, Home, Maximize2 } from 'lucide-react';
import { fetchProjects, deleteProject, saveProjectWithMedia } from '../redux/dashbord-card-1/projectSlice';
import ProjectForm from './ProjectForm'; // Imports the common project form layout

export default function LatestPropertyLaunches() {
  const dispatch = useDispatch();
  const { listings, isLoading } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const launches = listings.filter(p => p.projectType === 'latest-launches');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLaunch, setEditingLaunch] = useState(null);
  const [formData, setFormData] = useState({
    route: '', status: 'Newly Launched', title: '', location: '', price: '', 
    config: '', area: '', builder: '', image: null, carouselImages: [], amenities: [],
    projectType: 'latest-launches'
  });

  const handleOpenAdd = () => {
    setEditingLaunch(null);
    setFormData({
      route: '', status: 'Newly Launched', title: '', location: '', price: '', 
      config: '', area: '', builder: '', image: null, carouselImages: [],
      possessionDate: '', reraId: '', totalApartments: '', launchDate: '',
      availability: 'New and Resale', features: '', description: '', floorPlans: {},
      amenities: [], projectType: 'latest-launches'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (launch) => {
    setEditingLaunch(launch);
    setFormData({ 
      ...launch, 
      existingCarousel: launch.carouselImages, 
      carouselImages: [],
      amenities: launch.amenities || [],
      projectType: 'latest-launches'
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Confirm deletion of this new launch property card?")) {
      dispatch(deleteProject(id));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(saveProjectWithMedia({
      formData: { ...formData, projectType: 'latest-launches' },
      isEditing: !!editingLaunch,
      existingId: editingLaunch?.id
    }));
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 text-slate-800 p-3 sm:p-4 min-h-screen bg-white">

      {/* Structural Workspace Banner Head */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-black">
            Newly launched projects
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Control live pipeline tracking cards for newly launched catalog listings.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-5 py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 shadow-md cursor-pointer w-full sm:w-auto"
        >
          <Plus size={18} strokeWidth={2.5} /> Add Launch
        </button>
      </div>

      {/* Property Display Array Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {launches.map((project) => (
          <div key={project.id} className="bg-gray-200 border border-slate-200 rounded-3xl overflow-hidden shadow-md flex flex-col group hover:shadow-xl hover:border-blue-400/50 transition-all duration-300 relative">

            {/* Top accent border bar line */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-blue-700 opacity-40 group-hover:opacity-100 transition-opacity" />

            {/* Asset image and tag metrics */}
            <div className="h-40 sm:h-48 w-full relative overflow-hidden bg-slate-100">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-white/95 backdrop-blur-md text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 text-blue-700 border border-blue-200 rounded-xl shadow-sm">
                {project.status}
              </div>
            </div>

            {/* Meta Data Configuration Parameters */}
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

                {/* Construction Spec Indicators */}
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

              {/* Functional Controls and Price Strings */}
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
        isEditing={!!editingLaunch}
        existingId={editingLaunch?.id}
      />
    </div>
  );
}