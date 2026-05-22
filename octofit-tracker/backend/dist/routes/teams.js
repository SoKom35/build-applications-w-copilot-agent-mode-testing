import { Router } from 'express';
const router = Router();
router.get('/', (req, res) => {
    res.json({ message: 'Get all teams', endpoint: '/api/teams/' });
});
router.post('/', (req, res) => {
    res.json({ message: 'Create a new team', endpoint: '/api/teams/' });
});
router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Get team ${id}`, endpoint: `/api/teams/${id}` });
});
router.put('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Update team ${id}`, endpoint: `/api/teams/${id}` });
});
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Delete team ${id}`, endpoint: `/api/teams/${id}` });
});
export default router;
//# sourceMappingURL=teams.js.map