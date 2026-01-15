import { Router } from 'express';
import playlistRoutes from '../../modules/playlists/playlist.routes';
import trackRoutes from '../../modules/tracks/track.routes';
import playlistTracksRoutes from '../../modules/tracks/playlist-tracks.routes';

const router = Router();

router.use('/playlists', playlistRoutes);
router.use('/playlists/:playlistId/tracks', playlistTracksRoutes);
router.use('/tracks', trackRoutes);

export default router;
