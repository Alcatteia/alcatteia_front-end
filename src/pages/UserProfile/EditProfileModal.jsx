import React, { useState } from "react";
import { FaUser, FaCamera, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaCalendarAlt, FaSave } from "react-icons/fa";

import LogoPerfil from "../../assets/login/logo_login.svg";
import userService from "../../services/userService";
import { setSessionUser, getSessionUser } from "../../utils/sessionUser";


const initialFormData = {
    avatar: LogoPerfil,
    about: "",
};

const EditProfileModal = ({ editProfile, setEditProfile }) => {
    const [formData, setFormData] = useState(initialFormData);
    const [isSaving, setIsSaving] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const usuario = getSessionUser();

    if (!editProfile) return null;

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setHasChanges(true);
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({ ...prev, avatar: reader.result }));
                setHasChanges(true);
            };
            reader.readAsDataURL(file);
        }
    };

    // const validate = () => {
    //     const newErrors = {};
    //     if (!formData.about) newErrors.about = "Sobre é obrigatório";
    //     setErrors(newErrors);
    //     return Object.keys(newErrors).length === 0;
    // };

    const handleSave = async () => {
        // if (!validate()) return;
        setIsSaving(true);

        try {
            const response = await userService.atualizarUsuario(usuario.id, {
                descricao: formData.about,
            });
            console.log("Atualizado!", response.data);
            setSessionUser(response.data);
            
            setIsSaving(false);
            setHasChanges(false);
            setEditProfile(false);
        } catch (erro) {
            console.error("Erro ao atualizar:", erro);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-4">
            <div
                className="bg-[#1A1124] rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                    <div className="space-y-6">
                        {/* Avatar Section */}
                        <div className="flex flex-col items-center space-y-4">
                            <div className="relative">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center overflow-hidden">
                                    <img src={formData.avatar} alt="Avatar" className="w-full h-full object-cover" />
                                </div>
                                <label className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors">
                                    {/* <Camera className="w-4 h-4 text-white" /> */}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleAvatarChange}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                            <p className="text-sm text-gray-400">Clique no ícone para alterar a foto</p>
                        </div>
                        {/* Form Fields */}
                        {/* About Section */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Sobre</label>
                            <textarea
                                value={formData.about}
                                onChange={(e) => handleInputChange('about', e.target.value)}
                                rows={4}
                                className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all resize-none  'border-red-500 focus:ring-red-500/20' : 'border-gray-600 focus:border-blue-500 focus:ring-blue-500/20'
                                    `}
                                placeholder="Descreva um pouco sobre você e sua experiência profissional..."
                            />
                        </div>
                    </div>
                </div>
                {/* Footer */}
                <div className="flex items-center justify-between p-6 border-t border-purple-500/20 bg-white/5 ">
                    <div className="flex items-center gap-2">
                        {hasChanges && (
                            <div className="flex items-center gap-2 text-amber-400 text-sm">
                                <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                                Alterações não salvas
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setEditProfile(false)}
                            className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={isSaving || !hasChanges}
                            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
                        >
                            {isSaving ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Salvando...
                                </>
                            ) : (
                                <>
                                    <FaSave />
                                    Salvar alterações
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfileModal;