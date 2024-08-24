import { Project } from '../models/project.model.js';
import { User } from '../models/user.model.js'; // Make sure to use the correct case
import { nanoid } from 'nanoid';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import uploadOnCloudinary from '../Utils/cloudinary.js';
import ApiResponse from '../utils/ApiResponse.js';


export const createProject = asyncHandler(async (req,res)=>{
    const {title,description} = req.body;
    const imageFile = req.file;
    if(!title || !description ){
        throw new ApiError(400,"Please fill in all fields");
    }

    let imageUrl = "https://www.ntaskmanager.com/wp-content/uploads/2020/10/project-design-in-project-management.png"

    if(imageUrl){
        const imageUploadResponse = await uploadOnCloudinary(imageFile.path);
        imageUrl = imageUploadResponse.secure_url;
    }
    
    const newProject = new Project({
        title,
        description,
        image:imageUrl,
        leader:req.user._id,
        joinLink:nanoid(10)
    })
    await newProject.save();

    res.status(201).
    json(new ApiResponse(201,newProject,"Project created successfuly"));
    
})

export const getAllProjects = asyncHandler(async(req,res)=>{
    const projects = await Project.find();
    res.status(200).json(new ApiResponse(200, projects, 'Projects fetched successfully'));
});

export const getProjectById = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id)
        .populate('leader', 'name') // Populate leader's name
        .populate('teamMembers', 'name'); // Populate team members' names

    if (!project) {
        throw new ApiError(404, 'Project not found');
    }

    res.status(200).json(new ApiResponse(200, project, 'Project fetched successfully'));
});

export const updateProjectById = asyncHandler(async (req, res) => {
    const { title, description, image } = req.body;

    const updatedProject = await Project.findByIdAndUpdate(
        req.params.id,
        { title, description, image },
        { new: true, runValidators: true }
    );

    if (!updatedProject) {
        throw new ApiError(404, 'Project not found');
    }

    res.status(200).json(new ApiResponse(200, updatedProject, 'Project updated successfully'));
});

export const deleteProjectById = asyncHandler(async (req, res) => {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
        throw new ApiError(404, 'Project not found');
    }

    res.status(200).json(new ApiResponse(200, null, 'Project deleted successfully'));
});

export const addTeamMember = asyncHandler(async (req, res) => {
    const { projectId, userId } = req.body;

    const project = await Project.findById(projectId);

    if (!project) {
        throw new ApiError(404, 'Project not found');
    }

    if (project.leader.toString() !== req.user._id.toString()) {
        throw new ApiError(403, 'Only the project leader can add team members');
    }

    if (project.teamMembers.includes(userId)) {
        throw new ApiError(400, 'User is already a team member');
    }

    project.teamMembers.push(userId);
    await project.save();

    res.status(200).json(new ApiResponse(200, project, 'Team member added successfully'));
});

export const removeTeamMember = asyncHandler(async (req, res) => {
    const { projectId, userId } = req.body;

    const project = await Project.findById(projectId);

    if (!project) {
        throw new ApiError(404, 'Project not found');
    }

    if (project.leader.toString() !== req.user._id.toString()) {
        throw new ApiError(403, 'Only the project leader can remove team members');
    }

    project.teamMembers = project.teamMembers.filter(memberId => memberId.toString() !== userId);
    await project.save();

    res.status(200).json(new ApiResponse(200, project, 'Team member removed successfully'));
});

export const joinProject = asyncHandler(async (req, res) => {
    const { joinLink } = req.body;

    const project = await Project.findOne({ joinLink });

    if (!project) {
        throw new ApiError(404, 'Invalid join link');
    }

    if (project.teamMembers.includes(req.user._id)) {
        throw new ApiError(400, 'You are already a team member of this project');
    }

    project.teamMembers.push(req.user._id);
    await project.save();

    res.status(200).json(new ApiResponse(200, project, 'Joined the project successfully'));
});