import { Router } from 'express';
import playlistRoutes from '../../modules/playlists/playlist.routes';

const router = Router();

router.use('/playlists', playlistRoutes);

export default router;
