import { useState, useEffect, useCallback } from 'react';
import { getLoggedInMember, getMemberMetricsDetails } from '../services/memberService';
import { getFeedbacksForMember } from '../services/feedbackService';
import { translations } from '../locales/translations';

const useTranslation = (lang) => {
  return useCallback(
    (key) => {
      return translations[lang]?.[key] ?? translations['pt'][key] ?? key;
    },
    [lang]
  );
};

export const useMemberDashboardData = (currentLang) => {
  const t = useTranslation(currentLang);

  const [member, setMember] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [memberMetrics, setMemberMetrics] = useState({});

  const [isLoadingMember, setIsLoadingMember] = useState(true);
  const [isLoadingFeedbacks, setIsLoadingFeedbacks] = useState(true);
  const [isLoadingMetrics, setIsLoadingMetrics] = useState(true);

  const [memberError, setMemberError] = useState(null);
  const [feedbacksError, setFeedbacksError] = useState(null);
  const [metricsError, setMetricsError] = useState(null);

  useEffect(() => {
    const loadMemberData = async () => {
      setIsLoadingMember(true);
      setMemberError(null);
      try {
        const data = await getLoggedInMember();
        setMember(data);
      } catch (err) {
        setMemberError(t("memberLoadError"));
        console.error("Erro ao buscar dados do membro:", err);
      } finally {
        setIsLoadingMember(false);
      }
    };
    loadMemberData();
  }, [t]);

  useEffect(() => {
    if (member?.id) {
      const loadFeedbacks = async () => {
        setIsLoadingFeedbacks(true);
        setFeedbacksError(null);
        try {
          const fetchedFeedbacks = await getFeedbacksForMember(member.id);
          const sortedFeedbacks = [...fetchedFeedbacks].sort((a, b) =>
            a.read === b.read ? 0 : a.read ? 1 : -1
          );
          setFeedbacks(sortedFeedbacks);
        } catch (err) {
          setFeedbacksError(t("feedbackLoadError"));
          console.error("Erro ao buscar feedbacks:", err);
        } finally {
          setIsLoadingFeedbacks(false);
        }
      };

      const loadMetricsDetails = async () => {
        setIsLoadingMetrics(true);
        setMetricsError(null);
        try {
          const data = await getMemberMetricsDetails(member.id);
          setMemberMetrics(data);
        } catch (err) {
          setMetricsError(t("metricsLoadError"));
          console.error("Erro ao buscar métricas:", err);
        } finally {
          setIsLoadingMetrics(false);
        }
      };

      loadFeedbacks();
      loadMetricsDetails();
    }
  }, [member?.id, t]);

  return {
    member,
    feedbacks,
    memberMetrics,
    isLoadingMember,
    isLoadingFeedbacks,
    isLoadingMetrics,
    memberError,
    feedbacksError,
    metricsError,
    setFeedbacks
  };
};
