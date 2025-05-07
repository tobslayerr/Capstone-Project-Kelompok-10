import { prisma } from "../Config/Database.js";


export const createProfile = async (req, res, next) => {
    try {
      const {
        username,
        email,
        bio,
        instagram,
        twitter,
        website,
        linkedin,
      } = req.body;
  
      const profileImageUrl = req.file?.cloudinaryUrl || req.body.profile || null;
  
      const newProfile = await prisma.profile.create({
        data: {
          username,
          email,
          bio,
          profile: profileImageUrl,
          instagram,
          twitter,
          website,
          linkedin,
        },
      });
  
      res.status(201).json({
        success: true,
        data: newProfile,
      });
    } catch (err) {
      next(err);
    }
  };
  

export const seeProfile = async(req, res, next) => {
    try {
        const profile = await prisma.profile.findUnique({
            where: { id: req.params.id }
        });

        if (!profile) {
            res.status(404);
            throw new Error('Profile tidak ditemukan');
        }

        res.json({
            success: true,
            data: profile
        });
    } catch (err) {
       next(err);

        }
    };


    export const updateProfile = async (req, res, next) => {
        try {
          const {
            username,
            email,
            bio,
            instagram,
            twitter,
            website,
            linkedin,
          } = req.body;
      
          const profileImageUrl = req.file?.cloudinaryUrl || req.body.profile || undefined;
      
          const updatedProfile = await prisma.profile.update({
            where: { id: req.params.id },
            data: {
              username,
              email,
              bio,
              profile: profileImageUrl,
              instagram,
              twitter,
              website,
              linkedin,
            },
          });
      
          res.status(200).json({
            success: true,
            data: updatedProfile,
          });
        } catch (err) {
    
          if (err.code === 'P2025') {
            return res.status(404).json({ success: false, message: 'Profile tidak ditemukan' });
          }
          next(err);
        }
      };
      
export const deleteProfile = async(req, res, next) => {
    try {
        const deletedProfile = await prisma.profile.delete({
            where: { id: req.params.id }
        });

        if (!deletedProfile) {
            res.status(404);
            throw new Error('Profile tidak ditemukan');
        }

        res.json({
            success: true,
            message: 'Profile berhasil dihapus'
        });
    } catch (err) {
      next(err); 
    }
};