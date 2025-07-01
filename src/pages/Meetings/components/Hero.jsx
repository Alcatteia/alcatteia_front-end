
import { useContext, useState } from "react";
import ToggleViewButton from "./ToggleViewButton"
import { FaPlus } from "react-icons/fa";
import { MeetingsContext } from "../../../contexts/MeetingsContext";

const Hero = () => {
    const { meetings, setMeetings } = useContext(MeetingsContext);

    const [showMeetingForm, setShowMeetingForm] = useState(false);
    const [newMeeting, setNewMeeting] = useState({
        title: '',
        date: '',
        time: '',
        description: ''
    });

    // const [currentUser] = useState({
    //     id: '1',
    //     name: 'Isabelle Gomes',
    //     role: 'leader',
    //     email: 'isabelle@alcatteia.com'
    // });

   

    const handleCreateMeeting = (e) => {
        e.preventDefault();

        const meeting = {
            id: Date.now().toString(),
            title: newMeeting.title,
            date: newMeeting.date,
            time: newMeeting.time,
            administrator: 'Isabelle Gomes',
            participants: 0,
            status: 'scheduled',
            description: newMeeting.description
        };

        setMeetings([...meetings, meeting]);
        setNewMeeting({ title: '', date: '', time: '', description: '' });
        setShowMeetingForm(false);
    };

    return (
        <section className="flex flex-col px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
            <div className="text-center md:text-left">
                <h1 className="text-white text-3xl md:text-4xl font-extrabold">
                    Chamadas e reuniões
                </h1>
                <p className=" text-gray-400 text-lg mt-1">Reúna-se com a matilha para alinhamentos e conexões!</p>
            </div>

            <div className="mt-10 flex justify-center md:justify-end">
                <ToggleViewButton />
            </div>


            <div className="mb-8">
                <button
                    onClick={() => setShowMeetingForm(true)}
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-lg font-medium transition-all flex items-center space-x-2"
                >
                    <FaPlus size={20} />
                    <span>Criar Nova Reunião</span>
                </button>
            </div>

            {showMeetingForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-[#2d1b3d] rounded-lg p-6 w-full max-w-md border border-purple-700/30">
                        <h2 className="text-xl font-bold text-white mb-4">Criar Nova Reunião</h2>
                        <form onSubmit={handleCreateMeeting} className="space-y-4">
                            <div>
                                <label className="block !text-gray-300 text-sm font-medium mb-2">Título da Reunião</label>
                                <input
                                    type="text"
                                    value={newMeeting.title}
                                    onChange={(e) => setNewMeeting({ ...newMeeting, title: e.target.value })}
                                    className="w-full bg-[#1a1625] border border-purple-700/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                                    placeholder="Ex: Reunião de Alinhamento"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block !text-gray-300 text-sm font-medium mb-2">Data</label>
                                <input
                                    type="date"
                                    value={newMeeting.date}
                                    onChange={(e) => setNewMeeting({ ...newMeeting, date: e.target.value })}
                                    className="w-full bg-[#1a1625] border border-purple-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block !text-gray-300 text-sm font-medium mb-2">Horário</label>
                                <input
                                    type="time"
                                    value={newMeeting.time}
                                    onChange={(e) => setNewMeeting({ ...newMeeting, time: e.target.value })}
                                    className="w-full bg-[#1a1625] border border-purple-700/50 rounded-lg px-4 py-3 !text-white focus:outline-none focus:border-purple-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block !text-gray-300 text-sm font-medium mb-2">Descrição (opcional)</label>
                                <textarea
                                    value={newMeeting.description}
                                    onChange={(e) => setNewMeeting({ ...newMeeting, description: e.target.value })}
                                    className="w-full bg-[#1a1625] border border-purple-700/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 resize-none h-20"
                                    placeholder="Descreva o objetivo da reunião..."
                                />
                            </div>
                            <div className="flex space-x-3 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 rounded-lg font-medium transition-all"
                                >
                                    Criar Reunião
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowMeetingForm(false)}
                                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-medium transition-all"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    )
}

export default Hero