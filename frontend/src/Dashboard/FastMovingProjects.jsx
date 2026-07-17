import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Plus, Pencil, Trash2, MapPin, Building2, Home, Maximize2 } from 'lucide-react';
import { fetchProjects, deleteProject } from '../redux/dashbord-card-1/projectSlice';
import ProjectForm from './ProjectForm';

export default function FastMovingProjects() {
  const dispatch = useDispatch();
  const { listings, isLoading } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const projects = listings.filter(p => !p.projectType || p.projectType === 'fast-moving');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const [formData, setFormData] = useState({
    route: '', status: 'Ready to Move', title: '', location: '', price: '', 
    config: '', area: '', builder: '', image: null, carouselImages: [], amenities: [],
    projectType: 'fast-moving'
  });

  const handleOpenAdd = () => {
    setEditingProject(null);
    setFormData({
      route: '', status: 'Ready to Move', title: '', location: '', price: '', 
      config: '', area: '', builder: '', image: null, carouselImages: [],
      possessionDate: '', reraId: '', totalApartments: '', launchDate: '',
      availability: 'New and Resale', features: '', description: '', floorPlans: {},
      amenities: [], projectType: 'fast-moving'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project) => {
    setEditingProject(project);
    setFormData({ 
      ...project, 
      existingCarousel: project.carouselImages, 
      carouselImages: [],
      amenities: project.amenities || [],
      projectType: project.projectType || 'fast-moving'
    });
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 p-4 min-h-screen bg-white">
      <div className="flex justify-between items-center pb-4 border-b">
        <div>
          <h2 className="text-2xl font-bold text-black">FastMoving Projects Manager</h2>
          {isLoading && <p className="text-blue-600 text-sm animate-pulse">Syncing assets to media cloud buckets...</p>}
        </div>
        <button onClick={handleOpenAdd} className="bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm flex items-center gap-2 font-bold cursor-pointer">
          <Plus size={18} /> Add Listing
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="border rounded-3xl overflow-hidden shadow-md flex flex-col bg-white">
            <div className="h-48 w-full relative">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 bg-white/95 px-3 py-1 rounded-xl text-xs font-bold text-blue-700 shadow-sm border">
                {project.status}
              </div>
            </div>
            
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs text-slate-500 font-semibold">
                  <span className="flex items-center gap-1"><Building2 size={14} />{project.builder}</span>
                  <span className="bg-slate-100 px-2 py-0.5 rounded text-blue-700">/{project.route}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">{project.title}</h3>
                <div className="flex items-center gap-1 text-slate-500 text-xs font-medium">
                  <MapPin size={13} /> <span>{project.location}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t">
                <span className="font-extrabold text-blue-800">{project.price}</span>
                <div className="flex gap-2">
                  <button onClick={() => handleOpenEdit(project)} className="p-2 border rounded-xl hover:text-blue-700 cursor-pointer"><Pencil size={14} /></button>
                  <button onClick={() => dispatch(deleteProject(project.id))} className="p-2 border rounded-xl hover:text-red-600 cursor-pointer"><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ProjectForm 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        formData={formData} 
        setFormData={setFormData} 
        isEditing={!!editingProject} 
        existingId={editingProject?.id}
      />
    </div>
  );
}